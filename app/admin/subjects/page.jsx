"use client"
import React from 'react'
import DataTable from 'react-data-table-component';


function Subjects() {
    
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    
  const subjects =[
      {
        "name": "Kiswahili",
        "levels": "Standard 1-7, Form 1-4, Form 5-6",
        "medium": "Kiswahili",
        "category": "Languages",
        
      },
      {
        "name": "English",
        "levels": "Standard 1-7, Form 1-4, Form 5-6",
        "medium": "English",
        "category": "Languages",
        
      },
      {
        "name": "Mathematics",
        "levels": "Standard 1-7, Form 1-4",
        "medium": "English",
        "category": "Sciences",
        
      },
      {
        "name": "Advanced Mathematics",
        "levels": "Form 5-6",
        "medium": "English",
        "category": "Sciences",
        
      },
      {
        "name": "Biology",
        "levels": "Form 1-4, Form 5-6",
        "medium": "English",
        "category": "Sciences",
        
      },
      {
        "name": "Physics",
        "levels": "Form 1-4, Form 5-6",
        "medium": "English",
        "category": "Sciences",
        
      },
      {
        "name": "Chemistry",
        "levels": "Form 1-4, Form 5-6",
        "medium": "English",
        "category": "Sciences",
        
      },
      {
        "name": "Science and Technology",
        "levels": "Standard 1-7",
        "medium": "Bilingual",
        "category": "Sciences",
        
      },
      {
        "name": "Geography",
        "levels": "Form 1-4, Form 5-6",
        "medium": "English",
        "category": "Sciences",
        
      },
      {
        "name": "History",
        "levels": "Form 1-4, Form 5-6",
        "medium": "English",
        "category": "Humanities",
        
      },
      {
        "name": "Civics",
        "levels": "Form 1-4",
        "medium": "English",
        "category": "Humanities",
        
      },
      {
        "name": "Civic and Moral Education",
        "levels": "Standard 1-7",
        "medium": "Kiswahili",
        "category": "Humanities",
        
      },
      {
        "name": "Social Studies",
        "levels": "Standard 1-7",
        "medium": "Kiswahili",
        "category": "Humanities",
        
      },
      {
        "name": "Book Keeping",
        "levels": "Form 1-4",
        "medium": "English",
        "category": "Business",
        
      },
      {
        "name": "Commerce",
        "levels": "Form 1-4, Form 5-6",
        "medium": "English",
        "category": "Business",
        
      },
      {
        "name": "Economics",
        "levels": "Form 5-6",
        "medium": "English",
        "category": "Business",
        
      },
      {
        "name": "Accountancy",
        "levels": "Form 5-6",
        "medium": "English",
        "category": "Business",
        
      },
      {
        "name": "Agriculture",
        "levels": "Form 1-4",
        "medium": "English",
        "category": "Sciences",
        
      },
      {
        "name": "Vocational Skills",
        "levels": "Standard 1-7",
        "medium": "Bilingual",
        "category": "Practical",
        
      },
      {
        "name": "General Studies",
        "levels": "Form 5-6",
        "medium": "English",
        "category": "General",
        
      }
    ]

    const columns = [
      {
        name: "Name",
        selector: row=>row.name,
        sortable: true
      },
      {
        name: "Levels",
        selector: row=>row.levels,
        sortable: true
      },
      {
        name: "Medium",
        selector: row => row.medium
      },
      {
        name: "Category",
        selector: row => row.category,
        sortable: true,
        
      }
    ];

    const handleRowSelected = React.useCallback(state => {
      setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {
      const handleDelete = () => {
        alert("created this")
      };
      return <div className='space-x-5'>
  
  <button key="delete" className='p-2 text-xs text-white font-black' onClick={handleDelete} style={{
        backgroundColor: 'green'
      }} icon>
                  Activate
              </button>
      
      <button key="delete" className='p-2 text-xs text-white font-black' onClick={handleDelete} style={{
        backgroundColor: 'red'
      }} icon>
                  Delete
              </button>
              </div>;
    }, [ selectedRows, toggleCleared]);
  
  return (
    <div>
       <DataTable title={<div className='w-full flex justify-between px-2'><span>Subjects</span>  
       <span>+ new subject</span>
       </div>} 
       columns={columns} data={subjects} selectableRows contextActions={contextActions} onSelectedRowsChange={handleRowSelected} clearSelectedRows={toggleCleared} pagination />;

    </div>
  )
}

export default Subjects