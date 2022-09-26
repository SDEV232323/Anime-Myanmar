import React from "react";

const SamplePage = () => {

    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({ pageLanguage: 'en'}, 'google_translate_element')
     }
     
     React.useEffect(() => {
       var addScript = document.createElement('script');
       addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
       document.body.appendChild(addScript);
       window.googleTranslateElementInit = googleTranslateElementInit;
     }, [])

    //  window.location.replace(`/#googtrans(${"my"})`);

     return (
       <div style={{display: "none"}}>
         <h2 className="title gx-mb-4"><div id="sidebar.samplePage"/></h2>
         <div id="google_translate_element"></div>
         <div className="gx-d-flex justify-content-center">
           <h4>Start building your app. Happy Coding!</h4>
         </div>
   
       </div>
     );
   };
   
   export default SamplePage