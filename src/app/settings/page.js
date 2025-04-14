export default function Settings() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <form action="/api/setUrl" method="POST">
                <label htmlFor="url" style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                    Enter URL:
                </label>
                <input
                    id="url"
                    name="url"
                    type="text"
                    placeholder="Enter URL"
                    style={{
                        padding: '10px',
                        width: '300px',
                        border: '2px solid #007BFF', // Clearer border
                        borderRadius: '4px', // Rounded edges
                        marginBottom: '16px',
                        backgroundColor: '#F8F9FA', // Light gray background
                        fontSize: '16px',
                    }}
                />
                <br />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        border: '2px solid #007BFF', // Clear border
                        borderRadius: '4px',
                        backgroundColor: '#007BFF', // Blue background
                        color: 'white', // White text
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
