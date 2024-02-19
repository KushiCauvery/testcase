import React, { useState } from 'react';
import axios from 'axios';

function TestCasesForm() {
    const [codeSnippet, setCodeSnippet] = useState('');
    const [testCases, setTestCases] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true); // Set loading to true when form is submitted
            const response = await axios.post('http://127.0.0.1:8000/app/test-cases', { codeSnippet });
            setTestCases(response.data.test_cases);
            setError('');
        } catch (err) {
            setError('Error generating test cases. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false); // Set loading to false when response is received
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="codeSnippet">Please Enter Your Code Snippet here:</label>
                    <textarea
                        id="codeSnippet"
                        value={codeSnippet}
                        onChange={(e) => setCodeSnippet(e.target.value)}
                        rows={10}
                        cols={50}
                    />
                </div>
                <button type="submit" disabled={loading}>Generate Test Cases</button> {/* Disable button when loading */}
            </form>
            {loading && <p>Please wait...</p>} {/* Display loading message if loading is true */}
            {testCases && (
                <div>
                    <h3>Generated Test Cases:</h3>
                    <pre>{testCases}</pre>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default TestCasesForm;
