import React from 'react'

const About = () => (
  <div className="text-left md:text-center  text-black dark:text-white">
    <h3 className="text-lg italic font-medium">Ichi</h3>
    <p className="text-xs italic mb-5">gradients, gradients and gradients</p>

    <p className="text-sm mb-1">
      Ichi is about owning art. Art, which is simple and pleasant for the eye. Art, which is makes you happy and
      relaxed.
    </p>
    <p className="text-sm mb-5">
      If you find some other art piece you like, you can buy it (if the owner wants to part away with it of course), or
      you can sell yours. Like your personal gradient art museum.
    </p>

    <p className="text-sm">
      Ichi is about quality and not quantity, therefore there will be <strong className="italic">100 gradients</strong>{' '}
      in existence.
    </p>
    <p className="text-sm mb-10">No more, no less.</p>

    <p className="text-sm mb-5">
      We will start with <strong className="italic">10</strong>, and will create new ones for people to buy.
    </p>
    <div
      className={`inline-block h-10 w-10 rounded-full`}
      style={{ background: `linear-gradient(135deg, #F54EA2 0%, #FF7676 100%)` }}
    />
  </div>
)

export default About
