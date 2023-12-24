const AddButton = ({
  showModalHandler,
  width,
  height,
  border,
  text,
  textSize,
}) => {
  return (
    <div className="box--container" onClick={showModalHandler}>
      <span className="line line--vertical" />
      <span className="line line--horizontal" />
      <p className="text">{text}</p>
      <style jsx="true">{`
        .box--container {
          box-sizing: border-box;
          width: ${width}px;
          height: ${height}px;
          border: ${border}px solid white;
          border-radius: ${height / 6}px;
        }
        .text {
          font-size: ${textSize}px;
          top: ${height / 3.5 + 15}%;
          position: relative;
        }
        .line {
          display: block;
          width: ${width / 2.5}px;
          border-bottom: ${border}px solid white;
          border-radius: 5px;
        }
        .line--vertical {
          transform: rotate(90deg);
          position: relative;
          top: ${width / 2 - 16}px;
          left: ${width / 3.7}px;
        }
        .line--horizontal {
          top: ${width / 2.2 - 14}px;
          left: ${width / 3.7}px;
          position: relative;
        }
        .box--container:hover {
          color: black;
          cursor: pointer;
          transform: scale(1.03, 1.03);
        }
      `}</style>
    </div>
  );
};

export default AddButton;
