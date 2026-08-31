import { useState, useEffect } from 'react';
import API from '../services/api';
import { ResponsiveContainer, ComposedChart, Area, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalClasses: 0,
        presentToday: 0,
        absentToday: 0,
        permissionToday: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const resStudents = await API.get('/students');
            const resAttendance = await API.get('/attendance/today').catch(() => ({ data: [] }));

            const totalStudents = resStudents.data.length || 0;

            // 🌟 រាប់ចំនួនថ្នាក់ (Unique Classes) តាមសិស្សដែលមានស្រាប់
            const uniqueClasses = new Set(
                resStudents.data.map(s => s.className || s.class || s.grade)
            );
            const totalClassesCount = totalStudents > 0 ? uniqueClasses.size : 0;

            // 🌟 ត្រងយកតែទិន្នន័យវត្តមាន "ថ្ងៃនេះពិតប្រាកដ" កុំឱ្យវាបូកតគ្នាពីថ្ងៃមុនៗ
            const todayStr = new Date().toISOString().split('T')[0]; // ទម្រង់ YYYY-MM-DD
            const attendanceList = (resAttendance.data || []).filter(a => {
                if (!a.date && !a.createdAt) return true;
                const recordDate = (a.date || a.createdAt).split('T')[0];
                return recordDate === todayStr; // យកតែថ្ងៃនេះ
            });

            // គណនាវត្តមាន អវត្តមាន និងច្បាប់ សម្រាប់តែថ្ងៃនេះ
            const presentCount = attendanceList.filter(a => a.status === 'PRESENT' || a.status === 'Present').length;
            const permissionCount = attendanceList.filter(a => a.status === 'PERMISSION' || a.status === 'Permission').length;
            const absentCount = attendanceList.filter(a => a.status === 'ABSENT' || a.status === 'Absent').length;

            setStats({
                totalStudents: totalStudents,
                totalClasses: totalClassesCount,
                presentToday: presentCount,
                absentToday: absentCount,
                permissionToday: permissionCount
            });
            setLoading(false);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setLoading(false);
        }
    };

    const chartData = [
        { month: 'Jan', attendance: 4000 },
        { month: 'Feb', attendance: 5000 },
        { month: 'Mar', attendance: 6500 },
        { month: 'Apr', attendance: 5200 },
        { month: 'May', attendance: 11000 },
        { month: 'Jun', attendance: 9000 },
        { month: 'Jul', attendance: 7500 },
        { month: 'Aug', attendance: 6000 },
        { month: 'Sep', attendance: 5000 },
        { month: 'Oct', attendance: 5200 },
        { month: 'Nov', attendance: 4500 },
        { month: 'Dec', attendance: 4800 },
    ];

    // 🌟 គណនាភាគរយផ្អែកលើចំនួនសិស្សសរុបពិតប្រាកដ (ការពារការចេញ ១០០% ខុសធម្មតា)
    const total = stats.totalStudents > 0 ? stats.totalStudents : 1;
    const presentPercent = Math.round((stats.presentToday / total) * 100);
    const absentPercent = Math.round((stats.absentToday / total) * 100);
    const permissionPercent = Math.round((stats.permissionToday / total) * 100);

    return (
        <div className="container-fluid p-4">
            <div className="mb-4">
                <h2>📊 ទំព័រដើម (Dashboard)</h2>
                <p className="text-muted">ប្រព័ន្ធគ្រប់គ្រងវត្តមានសិស្ស</p>
            </div>

            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {/* ផ្នែក Top Cards ៤ ផ្ទាំង */}
                    <div className="row g-4 mb-4">
                        <div className="col-md-3">
                            <div className="card shadow-sm border-0 p-3 bg-white rounded-4">
                                <div className="d-flex align-items-center">
                                    <div className="bg-primary text-white p-3 rounded-3 me-3 fs-4">👨‍🎓</div>
                                    <div>
                                        <h6 className="text-muted mb-1">សិស្សសរុប</h6>
                                        <h3 className="fw-bold mb-0 text-dark">{stats.totalStudents}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card shadow-sm border-0 p-3 bg-white rounded-4">
                                <div className="d-flex align-items-center">
                                    <div className="bg-info text-white p-3 rounded-3 me-3 fs-4">🏫</div>
                                    <div>
                                        <h6 className="text-muted mb-1">ថ្នាក់រៀន</h6>
                                        <h3 className="fw-bold mb-0 text-dark">{stats.totalClasses}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card shadow-sm border-0 p-3 bg-white rounded-4">
                                <div className="d-flex align-items-center">
                                    <div className="bg-success text-white p-3 rounded-3 me-3 fs-4">✅</div>
                                    <div>
                                        <h6 className="text-muted mb-1">វត្តមានថ្ងៃនេះ</h6>
                                        <h3 className="fw-bold mb-0 text-success">{stats.presentToday}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card shadow-sm border-0 p-3 bg-white rounded-4">
                                <div className="d-flex align-items-center">
                                    <div className="bg-danger text-white p-3 rounded-3 me-3 fs-4">❌</div>
                                    <div>
                                        <h6 className="text-muted mb-1">អវត្តមានថ្ងៃនេះ</h6>
                                        <h3 className="fw-bold mb-0 text-danger">{stats.absentToday}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart និង Progress Status Bars */}
                    <div className="row g-4">
                        <div className="col-md-8">
                            <div className="card shadow-sm border-0 rounded-4 p-3 h-100">
                                <h5 className="fw-bold mb-3">📈 ស្ថិតិវត្តមានសិស្សប្រចាំខែ</h5>
                                <ResponsiveContainer width="100%" height={320}>
                                    <ComposedChart data={chartData}>
                                        <CartesianGrid stroke="#f5f5f5" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area
                                            type="monotone"
                                            dataKey="attendance"
                                            fill="#cfe2ff"
                                            stroke="#0d6efd"
                                            strokeWidth={2}
                                            isAnimationActive={true}
                                            animationDuration={1500}
                                        />
                                        <Bar
                                            dataKey="attendance"
                                            barSize={25}
                                            fill="#0d6efd"
                                            radius={[4, 4, 0, 0]}
                                            isAnimationActive={true}
                                            animationDuration={1500}
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* ផ្នែក Progress Status Bars ខាងស្តាំ */}
                        <div className="col-md-4">
                            <div className="card shadow-sm border-0 rounded-4 p-4 h-100">
                                <h5 className="fw-bold mb-4">📊 ស្ថានភាពវត្តមានសរុប</h5>

                                <div className="mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="fw-bold text-success">✅ វត្តមាន (Present)</span>
                                        <span>{presentPercent}%</span>
                                    </div>
                                    <div className="progress" style={{ height: '10px' }}>
                                        <div className="progress-bar bg-success" style={{ width: `${presentPercent}%` }}></div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="fw-bold text-warning">ច្បាប់ (Permission)</span>
                                        <span>{permissionPercent}%</span>
                                    </div>
                                    <div className="progress" style={{ height: '10px' }}>
                                        <div className="progress-bar bg-warning" style={{ width: `${permissionPercent}%` }}></div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="fw-bold text-danger">❌ អវត្តមាន (Absent)</span>
                                        <span>{absentPercent}%</span>
                                    </div>
                                    <div className="progress" style={{ height: '10px' }}>
                                        <div className="progress-bar bg-danger" style={{ width: `${absentPercent}%` }}></div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-3 text-center text-muted small border-top">
                                    ប្រព័ន្ធតាមដានវត្តមានស្វ័យប្រវត្តិកម្រិតខ្ពស់
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;