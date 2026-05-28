// import React from 'react'
// import "../style/home.scss"
// const Home = () => {
//     return (
//         <main className='home'>
//             <div className="left">
//                     <label htmlFor='resume'>Job Description</label>
//                 <textarea name='jobDescription' id='jobDescription' placeholder='Enter Job Description Here ...'></textarea>
//             </div>
//             <div className="right">
//                 <div className="input-group">
//                     <label htmlFor='resume'>Upload Resume</label>
//                     <input type="file" name='resume' id='resume' accept='.pdf' />
//                 </div>
//                 <div className="input-group">
//                     <label htmlFor='selfDescription'>Self Description</label>
//                     <textarea name="selfDescription" id="selfDescription" placeholder='Descirbe Yourself In Few Senteneces ...'></textarea>
//                 </div>
//                 <button className='generate-btn'>Generate Interview Report</button>
//             </div>
//         </main>
//     )
// }

// export default Home
import React, { useState, useRef } from 'react'
import "../style/home.scss"

const Home = () => {
  const [jobDescription, setJobDescription] = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const [fileName, setFileName] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) setFileName(file.name)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) setFileName(file.name)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  return (
    <main className='home'>
      {/* Header */}
      <div className="home__header">
        <h1>Create Your Custom <span className="accent">Interview Plan</span></h1>
        <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
      </div>

      {/* Main Card */}
      <div className="home__card">

        {/* Left Panel — Job Description */}
        <div className="panel panel--left">
          <div className="panel__title">
            <span className="panel__icon">💼</span>
            <h2>Target Job Description</h2>
            <span className="badge badge--required">REQUIRED</span>
          </div>
          <textarea
            name='jobDescription'
            id='jobDescription'
            placeholder={"Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            maxLength={5000}
          />
          <div className="char-count">{jobDescription.length} / 5000 chars</div>
        </div>

        {/* Divider */}
        <div className="panel-divider" />

        {/* Right Panel — Your Profile */}
        <div className="panel panel--right">
          <div className="panel__title">
            <span className="panel__icon">👤</span>
            <h2>Your Profile</h2>
          </div>

          {/* Upload Resume */}
          <div className="input-group">
            <label>
              Upload Resume <span className="badge badge--best">BEST RESULTS</span>
            </label>
            <div
              className={`drop-zone ${isDragging ? 'drop-zone--active' : ''} ${fileName ? 'drop-zone--filled' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                name='resume'
                id='resume'
                accept='.pdf,.docx'
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <div className="drop-zone__icon">
                {fileName ? '✅' : '☁️'}
              </div>
              <p className="drop-zone__text">
                {fileName ? fileName : 'Click to upload or drag & drop'}
              </p>
              {!fileName && <p className="drop-zone__hint">PDF or DOCX (Max 5MB)</p>}
            </div>
          </div>

          {/* Divider */}
          <div className="or-divider"><span>OR</span></div>

          {/* Self Description */}
          <div className="input-group">
            <label htmlFor='selfDescription'>Quick Self-Description</label>
            <textarea
              name="selfDescription"
              id="selfDescription"
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
            />
          </div>

          {/* Info Note */}
          <div className="info-note">
            <span className="info-note__icon">ℹ️</span>
            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="home__footer">
        <p className="footer__hint">✨ AI-Powered Strategy Generation &nbsp;•&nbsp; Approx 30s</p>
        <button className='generate-btn'>
          ★ &nbsp;Generate My Interview Strategy
        </button>
      </div>
    </main>
  )
}

export default Home