export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Susu Manager Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Today's Collection Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Today's Collection</h3>
            <p className="text-3xl font-bold text-green-600">GH₵ 0.00</p>
            <p className="text-sm text-gray-500 mt-2">0 payments</p>
          </div>
          
          {/* Monthly Collection Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Monthly Collection</h3>
            <p className="text-3xl font-bold text-blue-600">GH₵ 0.00</p>
            <p className="text-sm text-gray-500 mt-2">0 payments</p>
          </div>
          
          {/* Total Members Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Members</h3>
            <p className="text-3xl font-bold text-purple-600">0</p>
            <p className="text-sm text-gray-500 mt-2">0 active today</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition">
              Add New Member
            </button>
            <button className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition">
              Record Payment
            </button>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Setup Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-yellow-900">
            <li>Configure your environment variables in <code className="bg-yellow-100 px-2 py-1 rounded">.env.local</code></li>
            <li>Set up your Supabase project and database</li>
            <li>Run <code className="bg-yellow-100 px-2 py-1 rounded">npm run prisma:migrate</code> in the server directory</li>
            <li>Start the backend server: <code className="bg-yellow-100 px-2 py-1 rounded">npm run dev:server</code></li>
            <li>The dashboard will fetch data from the API at <code className="bg-yellow-100 px-2 py-1 rounded">http://localhost:5000</code></li>
          </ol>
        </div>
      </div>
    </div>
  );
}
