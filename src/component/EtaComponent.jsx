function EtaComponent({ eta, handleClose }) {
  return (
    <div className="etaList show flex justify-items-center items-center">
      {eta.map((etaObj, index) =>
        etaObj ? (
          <div
            key={index}
            className="items-center justify-center ps-4 text-sm font-normal items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-indigo-700 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
          >
            Eta {index + 1} 實時班次 : {etaObj.eta.slice(11, 16)}
          </div>
        ) : (
          <div key={index}>Eta is not provided by KMB</div>
        )
      )}
      <button onClick={handleClose} className="close-button">
        Close
      </button>
    </div>
  );
}

export default EtaComponent;
