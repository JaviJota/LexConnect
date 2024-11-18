import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const formatName = (name) => {
    return name
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
};

class Validation {
  static passwordRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  static emailRe = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  static email(email) {
    if (typeof email !== 'string') throw new Error('Email must be a string');
    if (!this.emailRe.test(email)) throw new Error('Email must be a valid format');
  };

  static password(password) {
    if (typeof password !== 'string') throw new Error('Password must be a string');
    if (!this.passwordRe.test(password)) throw new Error('Password must have at least 8 characters, including a number, an uppercase and a lowercase letter');
  };

  static validateField(field, fieldName) {
    if (typeof field !== 'string') throw new Error(`${fieldName} must be a string`);
  };
};  

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get user by id
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
    });
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    // Validate register fields
    Validation.email(email);

    Validation.validateField(firstName, 'First name');
    Validation.validateField(lastName, 'Last name');
    
    Validation.password(password);

    // Validate email not exists
    const user = await User.findOne({ where: { email } });
    if (user) throw new Error('Email already exists')
    
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    await User.create({
      email: email.trim().toLowerCase(),
      firstName: formatName(firstName),
      lastName: formatName(lastName),
      password: hashedPassword,
    });

    const newUser = await User.unscoped().findOne({
      where: { email: email.trim().toLowerCase() },
    });

    const accessToken = jwt.sign(
      { id: newUser.id, email: newUser.email }, 
      process.env.SECRET_KEY, 
      {
        expiresIn: '1h'
      });

    const refreshToken = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: '7d'
      });
  
    const { password: _, ...publicUser } = newUser.get();
    
    res
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({ "user": publicUser, "accessToken": accessToken });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    Validation.email(email);
    Validation.password(password);

    const user = await User.unscoped().findOne({
        where: { email: email.trim().toLowerCase() },
    });

    const isValid = await bcrypt.compare(password.trim(), user.password);
    if (!isValid) throw new Error('Email or password not valid.');

    const accessToken = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.SECRET_KEY, 
      {
        expiresIn: '1h'
      });

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: '7d'
      });
  
    const { password: _, ...publicUser } = user.get();

    res
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({ "user": publicUser, "accessToken": accessToken });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  };
};

export const logoutUser = async (req, res) => {
  try {
    res
    .clearCookie('refreshToken')
    res.status(200).json({ message: 'Logged out.' });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  };
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if(!refreshToken) throw new Error('Refresh token not found');

    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
      if(err) return res.status(403).json({ msg: 'Invalid refresh token' });

      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET_KEY,
        {
          expiresIn: '1h'
        }
      );
      res.json({ "accessToken": accessToken });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName, password } = req.body;

    const user = await User.findByPk(id);

    if (email) user.email = email.trim().toLowerCase();
    if (firstName) user.firstName = formatName(firstName);
    if (lastName) user.lastName = formatName(lastName);
    if (password) user.password = password.trim();

    await user.save();

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: { id },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};