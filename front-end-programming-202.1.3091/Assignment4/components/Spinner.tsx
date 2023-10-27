/**
 * simple css spinner
 * held as self contained component for readabilty
 */
export default function Spinner() {
  return (
    <span className="spinnerContainer">
      <span className="loader">
        <style>
          {`
          :root {
              --dims: 25px;
            }
            .spinnerContainer{
                display: inline-flex;
                margin-left: 25px;
                margin-top: 10px; 
            }
            .loader {
                
                border: calc(var(--dims) / 8) solid #f3f3f3;
                border-top: calc(var(--dims) / 8) solid #3498db;
                border-radius: 50%;
                width:var(--dims);
                height: var(--dims);
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            } 
            `}
        </style>
      </span>
    </span>
  );
}
