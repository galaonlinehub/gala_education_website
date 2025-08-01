export const partnerSchoolColumns = [
    {
        name: "Name",
        selector:row=>row.name
    },
    {
        name: "Phone number",
        selector: (row) => row.phone_number,
        width:"240px"
    },
    {
        name: "Email",
        selector: (row) => row.email,
        width:"240px"
    },
    {
        name: "Code",
        selector: (row) => row.code,
        width:"120px"
    },
    
];
