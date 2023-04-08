
function Content({ item }) {
    return (
        <div style={{margin: '3rem'}}>
            <h4>Let's get started</h4>
            <p>
                "Welcome to the {item} page, where you can manage and update all your {item} in one place. Browse
                through your inventory, edit details, and add new {item} to your collection!"
            </p>
        </div>
    );
}

export default Content;
