export default function UserInfoForm() {
  const handleSubmit = () => console.log("not yet implemented")
  return (
    <>
      <input type="checkbox" id="user-info-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Update User Info</h3>
            <label htmlFor="user-info-modal" className="btn-sm btn-circle btn">
              ✕
            </label>
          </div>
          <form className="mt-2 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Type here"
                className="input-bordered input input-sm w-full max-w-xs"
              />
            </div>
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
