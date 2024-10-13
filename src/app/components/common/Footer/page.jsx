export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 My Website. All rights reserved.</p>
        <div className="mt-2">
          <a href="/privacy" className="text-gray-400">Privacy Policy</a> | 
          <a href="/terms" className="text-gray-400 ml-2">Terms of Service</a>
        </div>
      </footer>
    );
  }
  