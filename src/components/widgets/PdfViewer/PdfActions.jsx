'use client'

export default function PdfActions({
  getFilePluginInstance,
  printPluginInstance,
}) {
  const { Download } = getFilePluginInstance
  const { Print } = printPluginInstance

  return (
    <div className="flex gap-2">
      <Download>
        {(props) => (
          <button
            type="button"
            className="flex h-[36px] w-[36px] items-center justify-center"
            onClick={props.onClick}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3419_5990)">
                <path
                  d="M9.02414 14.25C9.31972 14.2505 9.61248 14.1926 9.88561 14.0796C10.1587 13.9666 10.4068 13.8007 10.6156 13.5915L13.5549 10.65L12.4944 9.5925L9.76964 12.318L9.75014 0H8.25014L8.26964 12.306L5.55464 9.591L4.49414 10.65L7.43339 13.5892C7.64195 13.7987 7.88985 13.9649 8.16284 14.0783C8.43583 14.1917 8.72854 14.2501 9.02414 14.25Z"
                  fill="#212121"
                />
                <path
                  d="M16.5 12.0002V15.7502C16.5 15.9491 16.421 16.1399 16.2803 16.2806C16.1397 16.4212 15.9489 16.5002 15.75 16.5002H2.25C2.05109 16.5002 1.86032 16.4212 1.71967 16.2806C1.57902 16.1399 1.5 15.9491 1.5 15.7502V12.0002H0V15.7502C0 16.347 0.237053 16.9193 0.65901 17.3412C1.08097 17.7632 1.65326 18.0002 2.25 18.0002H15.75C16.3467 18.0002 16.919 17.7632 17.341 17.3412C17.7629 16.9193 18 16.347 18 15.7502V12.0002H16.5Z"
                  fill="#212121"
                />
              </g>
              <defs>
                <clipPath id="clip0_3419_5990">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        )}
      </Download>

      <Print>
        {(props) => (
          <button
            type="button"
            className="flex h-[36px] w-[36px] items-center justify-center"
            onClick={props.onClick}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3419_2033)">
                <path
                  d="M18 6.75C18 6.15326 17.7629 5.58097 17.341 5.15901C16.919 4.73705 16.3467 4.5 15.75 4.5H14.25V0H3.75V4.5H2.25C1.65326 4.5 1.08097 4.73705 0.65901 5.15901C0.237053 5.58097 0 6.15326 0 6.75L0 15.75H3.75V18H14.25V15.75H18V6.75ZM5.25 1.5H12.75V4.5H5.25V1.5ZM12.75 16.5H5.25V12H12.75V16.5ZM16.5 14.25H14.25V10.5H3.75V14.25H1.5V6.75C1.5 6.55109 1.57902 6.36032 1.71967 6.21967C1.86032 6.07902 2.05109 6 2.25 6H15.75C15.9489 6 16.1397 6.07902 16.2803 6.21967C16.421 6.36032 16.5 6.55109 16.5 6.75V14.25Z"
                  fill="#212121"
                />
                <path
                  d="M14.25 7.49951H11.25V8.99952H14.25V7.49951Z"
                  fill="#212121"
                />
              </g>
              <defs>
                <clipPath id="clip0_3419_2033">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        )}
      </Print>
    </div>
  )
}
