

export const customStyles = {
  header: {
    style: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#4f46e5', 
      paddingLeft: '16px',
      paddingTop: '10px',
    },
  },
  headRow: {
    style: {
      backgroundColor: '#1e3a8a', 
      color: '#fff',
      fontSize: '14px',
      fontWeight: '600',
      minHeight: '52px',
    },
  },
  headCells: {
    style: {
      color: 'white',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
  rows: {
    style: {
      fontSize: '14px',
      minHeight: '48px',
      '&:not(:last-of-type)': {
        borderBottom: '1px solid #f1f1f1',
      },
    },
    highlightOnHoverStyle: {
      backgroundColor: '#eef2ff', 
      borderBottomColor: '#e0e0e0',
      outline: '1px solid #c7d2fe', 
    },
  },
  cells: {
    style: {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
};
