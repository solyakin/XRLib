import React from 'react'
import MailchimpSubscribe from "react-mailchimp-subscribe"
import styles from '../styles/Footer.module.css'

const Footer = () => {

    // const url = "https://gmail.us12.list-manage.com/subscribe/post?u=7b94dbc2c81e46115878c25d7&id=42170e6ec5"
    const url = "https://gmail.us21.list-manage.com/subscribe/post?u=7eb8f7d9a7e05fb5894b9176b&amp;id=82d76a6894&amp;f_id=00ecc9e1f0"

    const CustomForm = ({ status, message, onValidated }) => {
        let email;
        const submit = () =>
          email &&
          email.value.indexOf("@") > -1 &&
          onValidated({
            EMAIL: email.value,
          });
      
        return (
          <div
            style={{
                width : "100%",
                display: "flex"
                }}
            >
            {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
            {status === "error" && (
              <div
                style={{ color: "red" }}
                dangerouslySetInnerHTML={{ __html: message }}
              />
            )}
            {status === "success" && (
              <div
                style={{ color: "green" }}
                dangerouslySetInnerHTML={{ __html: message }}
              />
            )}
            <input
              ref={node => (email = node)}
              type="email"
              placeholder="Your email"
            />
            <button
             onClick={submit}>
               <img src="/Vector (8).svg" alt="" />
            </button>
          </div>
        );
      };
      

  return (
    <div className={styles.footer}>
        <div className={styles.footer_wrapper}>
            <h3>Sign up for <br></br>the XR Atlas newsletter</h3>
            <p>Are you curious about the latest trends and developments in the world of XR, AI, and other emerging technologies? Then sign up for our newsletter and get a regular dose of insights, news, and inspiration delivered straight to your inbox. We’ll not spam you we promise.</p>
            <div className={styles.email_wrapper}>
                <MailchimpSubscribe
                url={url}
                render={({ subscribe, status, message }) => (
                    <CustomForm
                    status={status}
                    message={message}
                    onValidated={formData => subscribe(formData)}
                    />
                )}
                />
                {/* <input type="text" placeholder='Enter your email address.' />
                <img src="/Vector (8).svg" alt="" /> */}
            </div>

            <button onClick={() => window.scrollTo(0,0)}>
                <span>Back to the top</span>
                <img src="/Frame (1).svg" alt="" />
            </button>
            <div className={styles.copyright}>
                <p>©2022 All right reserved</p>
                <ul>
                    <li>Twitter</li>
                    <li>Discord</li>
                    <li>Linkedin</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer