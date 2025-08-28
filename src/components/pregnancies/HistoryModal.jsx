import { ChevronRight, History, Target, Timer, X } from "lucide-react";
import { date, formatTime, getMovementsAverage } from "../../helpers/date";

const HistoryModal = ({setShowHistory, preg}) => {
    const historicalData  = preg.kick_sessions
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-full">
                <History className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Movement History</h2>
            </div>
            <button
                onClick={() => setShowHistory(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
                <X className="w-5 h-5 text-gray-500" />
            </button>
            </div>
            
            <div className="overflow-y-auto max-h-96">
            {historicalData.map((session) => (
                <div key={session.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-800">{date(session.created_at)}</span>
                        <span className="text-sm text-gray-500">at {formatTime(session.time)}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                        <Target className="w-3 h-3 text-green-600" />
                        <span className="text-green-600 font-medium">{session.movements} movements</span>
                        </div>
                        <div className="flex items-center gap-1">
                        <Timer className="w-3 h-3 text-blue-600" />
                        <span className="text-blue-600">in {session.duration}</span>
                        </div>
                    </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                </div>
            ))}
            </div>
            
            <div className="p-4 bg-gray-50 text-center">
            <p className="text-sm text-gray-600">
                Average time to 10 movements: <span className="font-medium text-gray-800">{getMovementsAverage(historicalData)}</span>
            </p>
            </div>
        </div>
        </div>
    )
};



export default HistoryModal