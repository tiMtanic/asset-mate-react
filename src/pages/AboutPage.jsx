import React from 'react'

function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <div className="page-section-container">
        <p>AssetMate is a single page application to display company information including stock price data. It's using a mock backend. Because of that, the prices might not be up-to-date. The focus is to design a responsive frontend with a mobile first approach.</p>
      </div>
      <div id="github-info" className="page-section-container">You can find more detailed information in the <a href="https://github.com/tiMtanic/asset-mate-react" target="_blank">GitHub Repository</a></div>
    </>
  )
}

export default AboutPage