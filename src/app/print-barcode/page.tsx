export default function PrintBarcode() {
  return (
    <div className="flex h-full">
      <div className="flex w-full">
        <div className="flex h-full flex-grow card rounded-box p-10">
          <input
            type="text"
            placeholder="cari nama atau kode produk"
            className="input input-bordered w-full max-w-xs"
          />
          <details className="dropdown">
            <summary className="m-1 btn">open or close</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </details>
        </div>
        {/* <div className="divider divider-horizontal">OR</div> */}
        <div className="flex h-full flex-grow card bg-base-300 rounded-box place-items-center">
          content
        </div>
      </div>
    </div>
  );
}
