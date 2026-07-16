const BackgroundGlow = () => {

  return (

    <>

      <div
        className="
        fixed
        -top-40
        -left-40
        w-[550px]
        h-[550px]
        rounded-full
        bg-cyan-500/10
        blur-[180px]
        -z-10
        "
      />

      <div
        className="
        fixed
        bottom-0
        right-0
        w-[600px]
        h-[600px]
        rounded-full
        bg-purple-600/10
        blur-[180px]
        -z-10
        "
      />

    </>

  );

};

export default BackgroundGlow;