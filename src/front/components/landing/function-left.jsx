export const FunctionLeft = ({ img, title, desc, alt }) => {
  return (
    <div className="flex justify-center px-4 py-8 mt-10">
      <div className="flex flex-col md:flex-row max-w-xs md:max-w-5xl mx-auto">
        <div className="max-w-sm ms-1 md:ms-0 me-10">
          <h5 className="text-2xl md:text-3xl font-semibold text-gray-800">
            {title}
          </h5>
          <p className="leading-7 mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            tincidunt vulputate libero, in tristique neque fermentum vitae.
            Mauris consequat vel nibh sed lacinia. Donec at felis ultrices,
            vestibulum felis in, auctor mauris.
            <br />
            <br />
            Proin mattis massa augue, vel mollis lorem volutpat id. Vivamus
            hendrerit mi id ligula vulputate cursus. Nam semper malesuada nisi
            sit amet aliquet. Vivamus pretium lectus dolor, egestas facilisis
            nisi placerat at.
          </p>
          <div className="mt-5 mb-5 md:mb-0">
            <a
              href="#"
              className="rounded-md align-bottom bg-cyan-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Leer más
            </a>
          </div>
        </div>
        <img
          className="max-w-sm aspect-square object-cover rounded-3xl hidden md:block"
          src="https://media.istockphoto.com/id/1147544807/es/vector/no-imagen-en-miniatura-gr%C3%A1fico-vectorial.jpg?s=612x612&w=0&k=20&c=Bb7KlSXJXh3oSDlyFjIaCiB9llfXsgS7mHFZs6qUgVk="
          alt="Ejemplo"
        />
      </div>
    </div>
  );
};
