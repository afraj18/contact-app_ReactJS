
import React from 'react';

class AddContact extends React.Component {
    state = {
        name: "",
        email: ""
    }
    add = (e) => {
        e.preventDefault();
        if (this.state.name === "" || this.state.email === "") {
            alert("All the fields are mendotary!");
            return;
        }
        this.props.addContactHandler(this.state);
        // console.log(this.state);
        this.setState({ name: "", email: "" });
    }
    render() {
        return (
            <div className="ui  main">
                <br />
                <br />
                <h2>Add Contact</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div>
                        <label> Name </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div>
                        <label> E-Mail </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })} />

                    </div>
                    <br />
                    <button className="ui button blue">Add Contact</button>
                </form>

            </div>
        );
    }
}

export default AddContact;