import React from 'react';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    // console.log(props);

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact} />
        );
    });
    return (
        <div className="ui celled list">
            <h2> My Contact List </h2>
            {renderContactList}
        </div>
    );
}

export default ContactList;