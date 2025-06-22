import React from 'react'

const Footer = () => {
  return (
    <footer className="py-8 text-center bg-neutral-200">
        <p className="text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} Program Pendataan Komunitas Waria Wilayah Bintan Raya.
          <br />
          Powered by Sekolah Tinggi Teknologi Indonesia Tanjung Pinang.
        </p>
      </footer>
  )
}

export default Footer