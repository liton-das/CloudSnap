import React from 'react'

const Headers = () => {
  return (
    <>
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">Image Upload</h1>
          <p className="text-sm text-slate-500">Drag & drop or click to upload — responsive UI</p>
        </div>
      </header>
    </>
  );
}

export default Headers
