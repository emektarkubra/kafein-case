export default function EditNotes() {
    return (
        <>
            <div className="col-5" >
                <form>
                    <div className="form-group mb-3">
                        <label htmlFor="disabledTextInput" className="form-label">Change your note</label>
                        <input type="text" id="disabledTextInput" className="form-control" placeholder="Add your note" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="disabledTextInput" className="form-label">Change your priority (1-5)</label>
                        <input type="number" id="disabledTextInput" className="form-control" placeholder="Select priority" min="1" max="5" />
                    </div>
                    <div className="form-group mb-3">
                        <label className="d-block" htmlFor="exampleFormControlFile">Select Image</label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile" accept="image/png, image/jpeg" />
                    </div>

                </form>
            </div>
        </>
    )
}