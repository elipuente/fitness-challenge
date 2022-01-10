const Footer = () => {
  return (
    <footer className="flex justify-center p-6">
      <div className="w-full">
        <hr className="border-1 border-black mb-8" />
        <p className="text-center sm:text-right sm:mr-6">
          {"© " +
            new Date().getFullYear().toString() +
            " Eli Puente & Hannah Hentges"}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
