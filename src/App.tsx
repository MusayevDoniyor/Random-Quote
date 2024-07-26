import { useState, useEffect } from "react";

// Define the shape of the fetched data
interface Quote {
  quote: string;
  author: string;
}

function App() {
  const [data, setData] = useState<Quote[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const base_url = import.meta.env.VITE_BASE_URL;
  const api_key = import.meta.env.VITE_API_KEY;

  const fetchRandomQuotes = async () => {
    try {
      const response = await fetch(base_url, {
        headers: { "X-Api-Ke": api_key },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Quote[] = await response.json();
      setData(data);
      console.log(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuotes();
  }, []);

  const fetchNextQuote = () => {
    setLoading(true);
    setError(null);
    fetchRandomQuotes();
  };

  return (
    <div className="w-screen min-h-screen py-7 px-10 font-sans text-white bg-[#27313f] flex flex-col space-y-7 justify-center items-center">
      {loading ? (
        <div className="w-16 h-16 border-4 border-[#0d1117] border-t-cyan-500 rounded-full animate-spin"></div>
      ) : (
        <>
          {error ? (
            <p className="w-full max-w-md text-center bg-red-500 text-white text-xl py-3 rounded-md shadow-md">
              Error: {error}
            </p>
          ) : (
            <>
              {data && data.length > 0 ? (
                data.map((q, index) => (
                  <div
                    key={index}
                    className="border rounded-md max-w-lg p-7 bg-[#0d1117] text-cyan-500 font-semibold flex flex-col justify-between h-full italic"
                  >
                    <div>
                      <p className="text-base md:text-lg">
                        <span className="text-yellow-500">"</span>{" "}
                        <span>{q.quote}</span>{" "}
                        <span className="text-yellow-500">"</span>
                      </p>
                      <h3 className="text-end mt-10 font-bold text-xl md:text-2xl">
                        - {q.author}
                      </h3>
                    </div>

                    <button
                      onClick={fetchNextQuote}
                      className="self-end mt-5 py-3 px-7 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition"
                    >
                      Next Quote
                    </button>
                  </div>
                ))
              ) : (
                <p>There is no Quote</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
