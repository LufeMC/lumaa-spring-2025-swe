// ======================= TASK CARDS ==========================================>

export const cardS = (isComplete:boolean) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 5,
        borderRadius: 3,
        fontFamily: 'Dosis',
        transition: 'transform 0.3s, background-color 0.3s',
        backgroundColor: isComplete ? '#d4f8d4' : '#fff',
        '&:hover': { transform: 'scale(1.05)' }
    }
};

export const card_typo = (isComplete:boolean) => {
    return {
        mb: 1, 
        fontWeight: 'bold', 
        textDecoration: isComplete ? 'line-through' : 'none',
        color: isComplete ? 'gray' : 'black',
        fontFamily: 'Dosis',
    }
};

export const card_des = (isComplete:boolean) => {
    return {
        mb: 2, 
        color: isComplete ? 'gray' : 'black',
        textDecoration: isComplete ? 'line-through' : 'none',
        fontFamily: 'Dosis',
    }
}

export const editS = (isComplete:boolean) => {
    return {
        mr: 1, 
        borderRadius: '8px', 
        textTransform: 'none', 
        visibility: isComplete ? 'hidden' : 'visible',
        fontFamily: 'Dosis',
    }
}

export const deleteS = (isComplete:boolean) => {
    return {
        borderRadius: '8px', 
        textTransform: 'none', 
        visibility: isComplete ? 'hidden' : 'visible',
        fontFamily: 'Dosis',
    }
}