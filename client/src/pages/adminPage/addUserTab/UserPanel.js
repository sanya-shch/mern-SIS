import React from 'react'
import ObjectTable from 'react-object-table'
import axios from "axios/index";

import './react-object-table.css';

class UserPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
             ...this.state,
            objects: [],
            response: ""
        };
    }

    async componentWillMount(){
        this.getUser();
    }

    getUser = async () => {
        try {
            const users = await axios("/api/users/");
            this.setState({ objects: users.data.users });
            // console.log(this.state);
            // console.log(users.data);
        } catch (err) {
            console.log(err.message);
            this.setState({ response: err.message });
        }
    };

    addUser = async () => {
        try {
            const user = await axios.post("/api/users", {
                // name: "zzzz",
                // surname: "zzzzx",
                // login: "111111111111",
                // password: "1111111111",
                // role: "s"

                name: "---",
                surname: "---",
                login: "---",
                password: "---",
                role: "---"
            })
        } catch (err) {
            console.log(err.message);
            this.setState({ response: err.message });
        }
    };

    updateUser = async( index, values ) => {
         try {
            const user = await axios.put(`/api/users/${index}`, {
                // name: toString(this.state.objects[index].name),
                // surname: toString(this.state.objects[index].surname),
                // login: toString(this.state.objects[index].login),
                // password: toString(this.state.objects[index].password),
                // role: toString(this.state.objects[index].role)
                ...values
            });
            this.setState({response: user.data.message });
        } catch (err) {
            console.log(err.message);
            this.setState({ response: err.message });
        }
    };

    removeUser = async id => {
        try {
            const user = await axios.delete(`/api/users/${id}`);
            this.setState({response: user.data.message });
        } catch (err) {
            console.log(err.message);
            this.setState({ response: err.message });
        }
    };

    handleDelete(id){
        // console.log(id);
        this.removeUser(id);
        this.getUser();
    }

    handleAdd() {
        this.addUser();
        this.getUser();
    };

    handleUpdate(id, values) {
        // this.setState(prevState => {
        //     const stateChanges = {
        //         objects: prevState.objects,
        //     }
        //     prevState.objects.map((object, index) => {
        //         if (object.id === id) {
        //             stateChanges.objects[index] = {
        //                 ...object,
        //                 ...values,
        //             };
        //         }
        //     });
        //     return stateChanges;
        // });

        this.updateUser(id, values);
        this.getUser();
    }

    // handleDuplicate(id) {
    //     this.setState(prevState => {
    //         const stateChanges = {
    //             objects: prevState.objects,
    //         }
    //         var newId = 0;
    //         var original;
    //         prevState.objects.map((object) => {
    //             if (object.id === id) {
    //                 original = object;
    //             }
    //             if (object.id > newId) {
    //                 newId = object.id;
    //             }
    //         });
    //         newId++;
    //         if (original) {
    //             stateChanges.objects.push({
    //                 ...original,
    //                 id: newId,
    //             });
    //         }
    //         return stateChanges;
    //     });
    // }

    render() {
        return (<div>
            <ObjectTable
                columns={this.props.columns}
                objects={this.state.objects}
                onUpdate={this.handleUpdate.bind(this)}
                actions={[
                    // {label: 'Duplicate', func: this.handleDuplicate.bind(this)},
                    {label: 'delete', func: this.handleDelete.bind(this)},
                    {label: 'add', func: this.handleAdd.bind(this)}
                ]}
            />

                <p>{this.state.response}</p>
    </div>
        );
    }
}

UserPanel.defaultProps = {
    columns: [
        {
            name: 'First Name',
            key: 'name',
        },
        {
            name: 'Last Name',
            key: 'surname',
        },
        {
            name: 'Login',
            key: 'login',
        },
        {
            name: 'Password',
            key: 'password',
        },
        {
            name: 'Role',
            key: 'role',
        },
    ],
};

export default UserPanel;




// import React, { Component } from 'react';
//
// import SearchBar from "./SearchBar";
// import ProductTable from "./ProductTable";
// import axios from "axios/index";
//
// class UserPanel extends React.Component {
//
//     constructor(props) {
//         super(props);
//
//         //  this.state.products = [];
//         this.state = {
//             products: [{
//                         id: 1,
//                         name: "aaa",
//                         surname: "aaa",
//                         login: "123456789",
//                         password: "123456789",
//                         role: "a"
//                     }, {
//                         id: 2,
//                         name: "aaa",
//                         surname: "aaa",
//                         login: "123456789",
//                         password: "123456789",
//                         role: "a"
//                     }
//         ],
//             allUsers: null,
//             error: ""};
//         this.state.filterText = "";
//         // this.state.products = [
//         //     {
//         //         id: 1,
//         //         category: 'Sporting Goods',
//         //         price: '49.99',
//         //         qty: 12,
//         //         name: 'football'
//         //     }, {
//         //         id: 2,
//         //         category: 'Sporting Goods',
//         //         price: '9.99',
//         //         qty: 15,
//         //         name: 'baseball'
//         //     }, {
//         //         id: 3,
//         //         category: 'Sporting Goods',
//         //         price: '29.99',
//         //         qty: 14,
//         //         name: 'basketball'
//         //     }, {
//         //         id: 4,
//         //         category: 'Electronics',
//         //         price: '99.99',
//         //         qty: 34,
//         //         name: 'iPod Touch'
//         //     }, {
//         //         id: 5,
//         //         category: 'Electronics',
//         //         price: '399.99',
//         //         qty: 12,
//         //         name: 'iPhone 5'
//         //     }, {
//         //         id: 6,
//         //         category: 'Electronics',
//         //         price: '199.99',
//         //         qty: 23,
//         //         name: 'nexus 7'
//         //     }
//         // ];
//
//     }
//
//     async componentWillMount () {
//         // try {
//         //     const users = await axios("/api/users/");
//         //     this.setState({ products: users.data });
//         // } catch (err) {
//         //     console.log(err.message);
//         // }
//
//         try {
//             const newUser = await axios.post("/api/users/", {
//                     name: "aaaaa",
//                     surname: "aaaaaa",
//                     login: "123456789",
//                     password: "123465798",
//                     role: "a"
//                 }
//             );
//             console.log(`User ${newUser.data.newUser.name} created!`);
//         } catch (err) {
//             console.log(err.message);
//         }
//     }
//
//     addUser = async e => {
//         e.preventDefault();
//
//     };
//
//     updateUserHandler = async (e) => {
//         e.preventDefault();
//         try {
//             const user = await axios.put(`/api/users/${this.state.id}`, {
//                 name: this.refs.name.value,
//                 age: Number(this.refs.age.value),
//                 genre: this.refs.genre.value
//             });
//             this.setState({response: user.data.message });
//         } catch (err) {
//             this.setState({ response: err.message });
//         }
//     };
//
//     handleUserInput(filterText) {
//         this.setState({filterText: filterText});
//     };
//     handleRowDel(product) {
//         var index = this.state.products.indexOf(product);
//         this.state.products.splice(index, 1);
//         this.setState(this.state.products);
//     };
//
//     handleAddEvent(evt) {
//         var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
//         var product = {
//             id: id,
//             name: "",
//             surname: "",
//             login: "",
//             password: "",
//             role: ""
//         }
//         this.state.products.push(product);
//         this.setState(this.state.products);
//
//     }
//
//     handleProductTable(evt) {
//         var item = {
//             id: evt.target.id,
//             name: evt.target.name,
//             surname: evt.target.surname,
//             login: evt.target.login,
//             password: evt.target.password,
//             role: evt.target.role
//         };
//         var products = this.state.products.slice();
//         var newProducts = products.map(function(product) {
//
//             for (var key in product) {
//                 if (key == item.name && product.id == item.id) {
//                     product[key] = item.value;
//
//                 }
//             }
//             return product;
//         });
//         this.setState({products:newProducts});
//         //  console.log(this.state.products);
//     };
//
//     render() {
//
//         return (
//             <div>
//
//                 {/*<SearchBar*/}
//                 {/*filterText={this.state.filterText}*/}
//                 {/*onUserInput={this.handleUserInput.bind(this)}*/}
//             {/*/>*/}
//                 {/*<ProductTable*/}
//                     {/*onProductTableUpdate={this.handleProductTable.bind(this)}*/}
//                     {/*onRowAdd={this.handleAddEvent.bind(this)}*/}
//                     {/*onRowDel={this.handleRowDel.bind(this)}*/}
//                     {/*products={this.state.products}*/}
//                     {/*filterText={this.state.filterText}*/}
//                 {/*/>*/}
//             </div>
//         );
//
//     }
//
// }
//
// export default UserPanel;





// import React from 'react'
//
// import ObjectTable from 'react-object-table'
// import './react-object-table.css';
//
// class UserPanel extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             ...this.state,
//             objects: [
//                 {
//                     id: 1,
//                     firstName: 'Sean',
//                     lastName: 'MacMini',
//                 },
//                 {
//                     id: 2,
//                     firstName: 'Jarek',
//                     lastName: 'Grwovwatski',
//                 },
//             ],
//         };
//     }
//
//     handleUpdate(id, values) {
//         this.setState(prevState => {
//             const stateChanges = {
//                 objects: prevState.objects,
//             }
//             prevState.objects.map((object, index) => {
//                 if (object.id === id) {
//                     stateChanges.objects[index] = {
//                         ...object,
//                         ...values,
//                     };
//                 }
//             });
//             return stateChanges;
//         });
//     }
//     handleDuplicate(id) {
//         this.setState(prevState => {
//             const stateChanges = {
//                 objects: prevState.objects,
//             }
//             var newId = 0;
//             var original;
//             prevState.objects.map((object) => {
//                 if (object.id === id) {
//                     original = object;
//                 }
//                 if (object.id > newId) {
//                     newId = object.id;
//                 }
//             });
//             newId++;
//             if (original) {
//                 stateChanges.objects.push({
//                     ...original,
//                     id: newId,
//                 });
//             }
//             return stateChanges;
//         });
//     }
//
//     render() {
//         return (
//             <ObjectTable
//                 columns={this.props.columns}
//                 objects={this.state.objects}
//                 onUpdate={this.handleUpdate.bind(this)}
//                 actions={[
//                     {label: 'Duplicate', func: this.handleDuplicate.bind(this)},
//                 ]}
//             />
//
//         );
//     }
// }
//
// UserPanel.defaultProps = {
//     columns: [
//         {
//             name: 'First Name',
//             key: 'firstName',
//         },
//         {
//             name: 'Last Name',
//             key: 'lastName',
//         },
//     ],
// };
//
// export default UserPanel;

