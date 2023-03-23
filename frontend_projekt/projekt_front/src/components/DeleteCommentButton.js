
const DeleteCommentButton = async (id, comment) => {
    try {
        await fetch(`http://localhost:4200/${id}/comments/`, {
            method: 'DELETE',
            headers: {
         'Content-Type': 'application/json'
       },
            body: JSON.stringify(comment)
        });
    } catch (error) {
        console.log("error", error);
    }
};

export default DeleteCommentButton;
