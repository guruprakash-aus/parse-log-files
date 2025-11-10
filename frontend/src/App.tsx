import { FileUpload } from './components/FileUpload';
import { Dashboard } from './components/Dashboard';
import { useLogAnalysis } from './hooks/useLogAnalysis';
import './App.css';

function App() {
  const { data, isLoading, error, analyzeFile, reset } = useLogAnalysis();

  const handleFileSelect = async (file: File) => {
    await analyzeFile(file);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 HTTP Log Analyzer</h1>
        <p>Upload your server log files for instant analysis</p>
      </header>

      <main className="app-main">
        {!data && (
          <>
            <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />
            
            {error && (
              <div className="error-message">
                <strong>Error:</strong> {error}
              </div>
            )}
            
            {isLoading && (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Analyzing your log file...</p>
              </div>
            )}
          </>
        )}

        {data && <Dashboard data={data} onReset={reset} />}
      </main>

      <footer className="app-footer">
        <p>Built with React + TypeScript + FastAPI</p>
      </footer>
    </div>
  );
}

export default App;