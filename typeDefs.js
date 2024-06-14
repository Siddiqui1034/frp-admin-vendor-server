
export const typeDefs = `

scalar JSON

input UserInput{
    uid: String
    password: String
    phone: Int
    address: String
    role: String
}

type Vendor{
    uid: String
    password: String
    role: String
    phone: String
    email:String
    address:String
    _id:String
}

type Query{
 login(data: UserInput): JSON
 getVendors: [Vendor]
}

type Mutation{
    registerVendors(data: UserInput): JSON
    updateVendor(data:UserInput, id:String): JSON
    deleteVendor(id:String):JSON
}
`



// DAY-52 Lecture

// export const typeDefs= `

// type Query{
//     getProducts: String, 
//     getName: String
// }

// type Mutation{
//     SaveProducts: String
// }

// `