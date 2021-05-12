import React from 'react'
import { Link } from 'react-router-dom';


interface PreviewButtonProps {
  id: string;
}

const PreviewButton = ({ id }: PreviewButtonProps) => (
  <Link to={`/gradient/${id}`}>
    <button className="bg-white rounded-md p-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </button>
  </Link>
)

export default PreviewButton;