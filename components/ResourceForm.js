import { useState } from "react";

const DEFAULT_DATA = {
  title: "",
  description: "",
  link: "",
  priority: 2,
  timeToFinish: 60
}

const ResourceForm = ({ onFormSubmit, originalResource, formTitle}) => {

  // Default form data
  const [form, setForm] = useState(originalResource || DEFAULT_DATA);

  const resetForm = () => setForm(originalResource || DEFAULT_DATA);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setForm({...form, [name]: value});
  }

  const submitForm = () => {
    onFormSubmit(form);
  }

  return (
    <div className="resource-form">
      <h1 className="title">{ formTitle }</h1>
      <form>

        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input className="input" type="text" placeholder="Title" 
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea className="textarea" placeholder="Description..."
              name="description"
              value={form.description}
              onChange={handleChange} >
            </textarea>
          </div>
        </div>

        <div className="field">
          <label className="label">Link</label>
          <div className="control">
            <input className="input" type="text" placeholder="https://a.com" 
              name="link"
              value={form.link} 
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Priority</label>
          <div className="control">
            <div className="select">
              <select 
                value={form.priority}
                name="priority"
                onChange={handleChange}
                >
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Time to finish</label>
          <div className="control">
            <input className="input" type="number" placeholder="10" 
              name="timeToFinish"
              value={form.timeToFinish} 
              onChange={handleChange}
            />
          </div>
          <p className="help">Time is in minutes</p>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button 
              type="button"
              onClick={submitForm}
              className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button 
              type="button"
              onClick={resetForm}
              className="button is-link is-light">Reset</button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default ResourceForm;