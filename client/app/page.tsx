import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Susu Manager
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A platform to manage Susu collection in Ghana
          </p>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
            <p className="text-gray-700 mb-6">
              This is a full-stack Susu collection management system built with Next.js, Express, Prisma, and Supabase.
              Manage members, record daily payments, and track collections with ease.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Frontend</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Next.js 15</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• shadcn/ui</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Backend</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Express.js</li>
                  <li>• TypeScript</li>
                  <li>• Prisma ORM</li>
                  <li>• RESTful API</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Database</h3>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Supabase</li>
                  <li>• PostgreSQL</li>
                  <li>• Supabase Auth</li>
                  <li>• Row Level Security</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                View Dashboard
              </Link>
              <a
                href="https://github.com/McAnnison/SusuManager"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition font-medium"
              >
                View on GitHub
              </a>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">👥 Member Management</h3>
                <p className="text-gray-600 text-sm">
                  Add, update, and manage Susu members with daily contribution tracking.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">💰 Payment Recording</h3>
                <p className="text-gray-600 text-sm">
                  Record and track daily payments with detailed notes and timestamps.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">📊 Dashboard Analytics</h3>
                <p className="text-gray-600 text-sm">
                  View today's collections, monthly totals, and member contribution summaries.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🔐 Secure Authentication</h3>
                <p className="text-gray-600 text-sm">
                  Built-in authentication with Supabase Auth for secure access control.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-600">
            <p>
              See the{" "}
              <a
                href="https://github.com/McAnnison/SusuManager/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                README
              </a>{" "}
              for setup instructions and API documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
