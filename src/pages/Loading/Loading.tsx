import { LineWave } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <LineWave
        visible={true}
        height="150"
        width="150"
        color="#487fe6"
        ariaLabel="line-wave-loading"
      />
    </div>
  );
};

export default Loading;
