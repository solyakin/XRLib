import React, { useState } from 'react'
import MailchimpSubscribe from "react-mailchimp-subscribe";
import InputField from './InputField';

const SubscribeForm = () => {

    const url = "https://gmail.us12.list-manage.com/subscribe/post?u=7b94dbc2c81e46115878c25d7&id=42170e6ec5"
  return (
    <div>
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
    </div>
  )
}

export default SubscribeForm


export const CustomForm = ({ status, message, onValidated }) => {

    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        email && email.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email,
        });
    }
    return (
      <form className="mc__form" onSubmit={(e) => handleSubmit(e)}>
            <div className="mc__field-container">
                <InputField
                    label="Email"
                    onChangeHandler={setEmail}
                    type="email"
                    value={email}
                    name={email}
                    placeholder="your@email.com"
                    isRequired
                />
            </div>
            <button type='submit'>Subscribe</button>

            <InputField
            label="subscribe"
            type="submit"
            formValues={[email]}
        />

        {status === "sending" && (
          <div className="mc__alert mc__alert--sending">
            sending...
          </div>
        )}
        {status === "error" && (
          <div 
            className="mc__alert mc__alert--error"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <div
            className="mc__alert mc__alert--success"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
      </form>
    );
};
