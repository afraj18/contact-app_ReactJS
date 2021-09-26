import React, { useEffect, useState } from "react";
import firebase from "./firebase"
// import { database } from './firebase';
// import database from './fireDB';
import { Button, Container, Form, Grid, Input, Label, Segment, Table, Header, Icon } from "semantic-ui-react";


const FirebaseCrud = () => {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [ufname, setUfname] = useState("");
    const [ulname, setUlname] = useState("");
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const firestore = firebase.database().ref('/userInfo');
        firestore.on('value', (response) => {
            const data = response.val();
            let userInfo = [];
            for (let id in data) {
                userInfo.push({
                    id: id,
                    firstName: data[id].firstName,
                    lastName: data[id].lastName
                })
            }
            setUserData(userInfo);
        })
    }, [])

    const handleUser = () => {

        const firestore = firebase.database().ref('/userInfo');
        let data = {
            firstName: fname,
            lastName: lname
        }
        if (fname !== "" && lname !== "") {
            if (firestore.push(data)) {
                // alert(fname + " " + lname + " is saved successfully")
                setFname('')
                setLname('')
            }
            else {
                alert("Failed")
            }
        } else {
            alert("All the fields are mendotary")
        }


    }

    const handleUpdateUser = () => {
        // alert("function not finalized  ")
        const firestore = firebase.database().ref("/userInfo").child(userId);
        firestore.update({
            firstName: ufname,
            lastName: ulname
        })
        setUfname('')
        setUlname('')
    };

    const handleUpdateClick = (data) => {
        setUfname(data.firstName)
        setUlname(data.lastName)
        setUserId(data.id)
        // alert("clicked" + data.id)

    };

    const handleDelete = (id) => {
        const firestore = firebase.database().ref("/userInfo").child(id);
        firestore.remove();
    }

    return <div className="ui hidden divider " style={{ minHeight: "0vh" }}>
        <Container >
            <Grid>
                <Grid.Row columns="2">
                    <Grid.Column>
                        <Segment>
                            <Form>
                                <Form.Field>
                                    <Label className=""> First Name  :  </Label>
                                    <Input size='large' type="text" placeholder="First Name" value={fname} onChange={(e) => { setFname(e.target.value) }} focus />
                                </Form.Field>
                                <Form.Field>
                                    <Label className="mb-1"> Last Name  :  </Label>
                                    <Input size='large' type="text" placeholder="Last Name" focus value={lname} onChange={(e) => { setLname(e.target.value) }} />
                                </Form.Field>
                                <Form.Field>
                                    <Button onClick={handleUser} primary>
                                        <Icon name="add circle"></Icon>
                                        Add User </Button>
                                </Form.Field>
                            </Form>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Form>
                                <Form.Field>
                                    <Label className=""> First Name  :  </Label>
                                    <Input size='large'
                                        type="text"
                                        placeholder="First Name"
                                        value={ufname}
                                        onChange={(e) => { setUfname(e.target.value) }} focus />
                                </Form.Field>
                                <Form.Field>
                                    <Label className="mb-1">
                                        Last Name  :
                                    </Label>
                                    <Input
                                        size='large'
                                        type="text"
                                        placeholder="Last Name"
                                        focus value={ulname}
                                        onChange={(e) => { setUlname(e.target.value) }} />
                                </Form.Field>
                                <Form.Field>
                                    <Button
                                        onClick={handleUpdateUser}
                                        positive><Icon name="edit "></Icon>Update User

                                    </Button>

                                </Form.Field>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="1">
                    <Grid.Column>
                        {
                            userData === 0 ?
                                <Segment padded="very">
                                    <Header textAlign="center">
                                        Oops There is no data here.. Please enter some data
                                    </Header>
                                </Segment> :
                                <Segment padded="very">
                                    <Table celled fixed singleLine>
                                        <Table.Header>
                                            <Table.HeaderCell>First Name</Table.HeaderCell>
                                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                                            <Table.HeaderCell></Table.HeaderCell>
                                        </Table.Header>
                                        {
                                            userData.map((data, index) => {
                                                return (
                                                    <Table.Body>
                                                        <Table.Cell>
                                                            {data.firstName}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {data.lastName}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Button primary onClick={() => { handleUpdateClick(data) }}>
                                                                <Icon name="edit" />
                                                                Update</Button>
                                                            <Button color="red" onClick={() => { handleDelete(data.id) }}>
                                                                <Icon name="trash" />
                                                                Delete</Button>
                                                        </Table.Cell>
                                                    </Table.Body>
                                                )
                                            })
                                        }
                                    </Table>
                                </Segment>
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>

    </div >
}
export default FirebaseCrud;