import React, { useEffect, useState } from "react";
import firebase from "./firebase"
import { database } from './firebase';
// import database from './fireDB';
import { Button, Container, Form, Grid, Input, Label, Segment, Table, Header, Tab, Icon } from "semantic-ui-react";


const FirebaseCrud = () => {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
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
                alert(fname + " " + lname + "is saved successfully")
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

    return <div className="ui hidden divider">
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
                                    <Button onClick={handleUser} primary>Add User </Button>
                                </Form.Field>
                            </Form>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>Edit User </Grid.Column>
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
                                                            <Button primary>
                                                                <Icon name="edit" />
                                                                Update</Button>
                                                            <Button color="red">
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