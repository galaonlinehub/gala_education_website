'use client';
import React, { useEffect, useState } from 'react';
import { Card, Rate, Avatar, Badge, Tag, Divider, Empty, Button } from 'antd';
import { UserOutlined, BookOutlined, StarOutlined, MessageOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import { useReviews } from '@/src/hooks/data/useReviews';
import { useInstructorCohorts } from '@/src/hooks/useInstructorCohorts';
import { LuArrowLeft, LuBook, LuBookA, LuBookImage, LuCalendar, LuLibrary, LuMessageSquare } from 'react-icons/lu';
import { IoArrowBackCircle, IoChevronForwardCircle } from 'react-icons/io5';
import { useInstructorProfile } from '@/src/hooks/useInstructorProfile';
import { img_base_url } from '@/src/config/settings';



const ReviewsAndRatings = () => {
  const [selectedClass, setSelectedClass] = useState(false);
  const [activeTab, setActiveTab] = useState('instructor_reviews');
  const [className, setClassName] = useState('');
  const [topicTitle, setTopicTitle] = useState('');
  const [reviewCount, setReviewCount] = useState(0);
  const [studentsEnrolled, setStudentsEnrolled] = useState(0);
  const [avgRating, setAverageRating] = useState(0);

  const [cohortId, setCohortId] = useState(6);

  function formatDateTime(isoDateString) {
    const date = new Date(isoDateString);
    return date.toLocaleString();
  }

  const { instructorProfile } = useInstructorProfile();

  const {
    instructorReviews,
    cohortReviews,
    isInstructorReviewsPending,
    isCohortReviewsPending,
    isInstructorReviewsError,
    isCohortReviewsError,
    instructorReviewsError,
    cohortReviewsError,
    instructorSummary,
    cohortSummary,
    isInstructorSummaryPending,
    isCohortSummaryPending,
    refetchCohortSummary
  } = useReviews(cohortId);

  function countReview(InstructorCohorts) {
    let total = 0;

    InstructorCohorts.forEach(cohort => {
      total += cohort.data.review_summary?.total_reviews || 0;
    });

    setReviewCount(total);
  }

  const { InstructorCohorts, isInstructorCohortsPending } = useInstructorCohorts();

  useEffect(() => {
    if (InstructorCohorts && InstructorCohorts.length > 0) {
      countReview(InstructorCohorts);
    }
  }, [InstructorCohorts]);



  console.log("Instructor Reviews:", instructorReviews);
  console.log("cohortReviews:", cohortReviews);
  console.log("Instructor cohorts:", InstructorCohorts);
  console.log("Instructor SUMMARY:", instructorSummary);
  console.log("Instructor Profile:", instructorProfile);

  const handleViewReviews = (cohort_id, class_name, topic, student_count, average_rating) => {
    setSelectedClass(true);
    setCohortId(cohort_id);
    setClassName(class_name);
    setTopicTitle(topic);
    setStudentsEnrolled(student_count);
    setAverageRating(average_rating);
  }



  const viewInstructorReviews = () => {
    setActiveTab('instructor_reviews');
  }

  const viewClassReviews = () => {
    setSelectedClass(false);
    setActiveTab('class_reviews');

  }


  const studentRatings = [
    {
      id: 1,
      studentName: "Alice Johnson Alice Johnson Alice Johnson",
      studentAvatar: null,
      rating: 5,
      comment: "Excellent teacher! Very clear explanations and always available for help. I learned so much in this semester.",
      subject: "Mathematics",
      date: "2024-06-15",
      semester: "Spring 2024"
    },
    {
      id: 2,
      studentName: "Michael Chen",
      studentAvatar: null,
      rating: 4,
      comment: "Good teaching style and well-organized lessons. Sometimes goes a bit fast but overall great experience.",
      subject: "Physics",
      date: "2024-06-10",
      semester: "Spring 2024"
    },
    {
      id: 3,
      studentName: "Sarah Williams",
      studentAvatar: null,
      rating: 5,
      comment: "Amazing teacher! Makes complex topics easy to understand. Very patient and encouraging.",
      subject: "Chemistry",
      date: "2024-06-08",
      semester: "Spring 2024"
    },
    {
      id: 4,
      studentName: "David Brown",
      studentAvatar: null,
      rating: 4,
      comment: "Knowledgeable and professional. Homework assignments are challenging but fair.",
      subject: "Mathematics",
      date: "2024-06-05",
      semester: "Spring 2024"
    }
  ];

  // Mock data for class ratings and comments
  const classRatings = [
    {
      id: 1,
      className: "Advanced Mathematics - Calculus II",
      classCode: "MATH-301",
      semester: "Spring 2024",
      totalStudents: 28,
      averageRating: 4.6,
      totalReviews: 25,
      description: "Advanced calculus covering integration techniques, series, and differential equations",
      schedule: "Mon, Wed, Fri - 10:00 AM",
      room: "Room 205, Math Building",
      reviews: [
        {
          id: 1,
          studentName: "Emma Davis",
          comment: "Challenging but rewarding class. The professor explains complex concepts very clearly.",
          rating: 5,
          date: "2024-06-18",
          helpful: 12
        },
        {
          id: 2,
          studentName: "James Wilson",
          comment: "Great preparation for advanced courses. Homework is tough but fair.",
          rating: 4,
          date: "2024-06-17",
          helpful: 8
        },
        {
          id: 3,
          studentName: "Lisa Anderson",
          comment: "Well-structured curriculum. Love the real-world applications.",
          rating: 5,
          date: "2024-06-15",
          helpful: 15
        },
        {
          id: 4,
          studentName: "Robert Kim",
          comment: "Excellent teaching methods. Makes calculus actually enjoyable!",
          rating: 5,
          date: "2024-06-14",
          helpful: 20
        },
        {
          id: 5,
          studentName: "Sophie Martinez",
          comment: "Good class overall. Sometimes the pace is a bit fast.",
          rating: 4,
          date: "2024-06-12",
          helpful: 6
        }
      ]
    },
    {
      id: 2,
      className: "General Physics - Mechanics",
      classCode: "PHYS-201",
      semester: "Spring 2024",
      totalStudents: 35,
      averageRating: 4.3,
      totalReviews: 32,
      description: "Introduction to classical mechanics, forces, energy, and motion",
      schedule: "Tue, Thu - 2:00 PM",
      room: "Room 102, Physics Lab",
      reviews: [
        {
          id: 1,
          studentName: "Kevin Martinez",
          comment: "Lab sessions are very helpful. Great hands-on learning experience.",
          rating: 4,
          date: "2024-06-16",
          helpful: 14
        },
        {
          id: 2,
          studentName: "Rachel Green",
          comment: "Clear explanations of complex concepts. Love the interactive demos.",
          rating: 5,
          date: "2024-06-15",
          helpful: 18
        },
        {
          id: 3,
          studentName: "Tom Jackson",
          comment: "Good use of real-world examples. Makes physics relatable.",
          rating: 4,
          date: "2024-06-13",
          helpful: 11
        },
        {
          id: 4,
          studentName: "Amy Chen",
          comment: "Challenging but fair. Appreciate the extra office hours.",
          rating: 4,
          date: "2024-06-11",
          helpful: 9
        }
      ]
    },
    {
      id: 3,
      className: "Organic Chemistry I",
      classCode: "CHEM-311",
      semester: "Spring 2024",
      totalStudents: 22,
      averageRating: 4.8,
      totalReviews: 20,
      description: "Fundamental principles of organic chemistry and molecular structures",
      schedule: "Mon, Wed, Fri - 1:00 PM",
      room: "Room 301, Chemistry Lab",
      reviews: [
        {
          id: 1,
          studentName: "Maria Rodriguez",
          comment: "Best chemistry teacher ever! Makes organic chemistry actually fun.",
          rating: 5,
          date: "2024-06-19",
          helpful: 25
        },
        {
          id: 2,
          studentName: "Chris Taylor",
          comment: "Makes organic chemistry actually enjoyable. Great visual aids.",
          rating: 5,
          date: "2024-06-18",
          helpful: 22
        },
        {
          id: 3,
          studentName: "Anna White",
          comment: "Excellent lab guidance. Very patient with questions.",
          rating: 5,
          date: "2024-06-16",
          helpful: 19
        },
        {
          id: 4,
          studentName: "Daniel Lee",
          comment: "Outstanding professor! Clear explanations and great examples.",
          rating: 5,
          date: "2024-06-14",
          helpful: 17
        }
      ]
    }
  ];

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getOverallStats = () => {
    const totalReviews = studentRatings.length;
    const averageRating = studentRatings.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    return { totalReviews, averageRating: averageRating.toFixed(1) };
  };

  const stats = getOverallStats();

  const renderStudentReviews = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-lg text-center sm:text-xl font-semibold text-gray-800">Individual Student Feedback</h2>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
        {instructorReviews?.map((review) => (
          <Card
            key={review.id}
            className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500"
            styles={{ body: { padding: '16px sm:24px' } }}
          >
            <div className="flex items-start space-x-3 sm:space-x-4">
              <Avatar
                src={review.student_profile_picture && `${img_base_url + review.student_profile_picture}`}
                size={window.innerWidth < 640 ? 36 : 48}
                icon={<UserOutlined />}
                className="bg-gradient-to-r flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-2 sm:gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{review.student_name}</h3>
                  </div>
                  <div className="text-right flex items-center gap-2 flex-shrink-0">
                    <Rate disabled defaultValue={review.rating} className="text-[10px] sm:text-sm" />
                    <div className={`font-bold text-[12px] sm:text-lg ${getRatingColor(review.rating)}`}>
                      {review.rating}.0
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed bg-gray-50 p-2 sm:p-3 rounded-lg text-xs sm:text-sm">
                  "{review.comment}"
                </p>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 pt-3 border-t gap-2">
                  <span className="text-xs flex items-center text-gray-400">
                    <LuCalendar className="mr-1" />
                    <span>{formatDateTime(review.created_at)}</span>
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderClassPerformance = () => {
    if (!selectedClass) {
      return (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h2 className="text-lg text-center sm:text-xl font-semibold text-gray-800">My Classes</h2>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
            {InstructorCohorts?.map((classData) => (
              <Card
                key={classData.data.id}
                className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-[#001840] cursor-pointer flex flex-col h-full"
                styles={{ body: { padding: '16px sm:24px', display: 'flex', flexDirection: 'column', height: '100%' } }}
              >
                <div className="flex-1 flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-blue-500 mb-2 break-words">{classData.data.topic.title}</h3>
                      <div className="flex flex-wrap mb-3">
                        <Tag color="#001840" className="text-xs">{classData.data.topic.subject.name}</Tag>
                        <Tag color="#001840" className="text-xs font-bold">{classData.data.cohort_name}</Tag>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-3 text-xs sm:text-sm">{classData.data.description}</p>
                      <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <CalendarOutlined className="flex-shrink-0" />
                          <div className="break-all text-gray-600 font-semibold"><span className='text-green-600'>{classData.data.timetable.start_date} -</span> <span className='text-red-600'>{classData.data.timetable.end_date}</span></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TeamOutlined className="flex-shrink-0" />
                          <span className="break-all text-xs font-bold">{classData.students} student(s)</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center flex-shrink-0 bg-gray-50 rounded-lg p-3 sm:p-4 sm:bg-transparent">
                      <div className={`text-2xl sm:text-3xl font-bold ${getRatingColor(classData.averageRating)}`}>
                        {classData.averageRating}
                      </div>
                      <Rate disabled defaultValue={classData.data.review_summary.average_rating} className="text-xs sm:text-sm" />
                      <div className="text-xs font-bold">
                        {classData.data.review_summary.total_reviews} review(s)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button type="link" onClick={() => handleViewReviews(classData.data.id, classData.data.cohort_name, classData.data.topic.title, classData.students, classData.data.review_summary.average_rating)} className="p-0 h-auto !text-[#001840] hover:text-blue-800 text-sm font-semibold">
                    View Reviews <IoChevronForwardCircle size={20} className='animate-bounce-horizontal' color='#001840' />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      );
    }

    return (
      <>
        <Button
          type="link"
          className=" mb-2 !text-blue-900 font-semibold p-2 bg-blue-100/50 hover:!text-blue-800 hover:!bg-blue-100 text-sm"
          onClick={() => setSelectedClass(false)}
        >
          <IoArrowBackCircle size={20} /> Back to Classes
        </Button>

        <div className="flex flex-col sm:flex-row w-full justify-between items-center gap-4">
          <div className="flex-1 flex flex-col items-center sm:items-start min-w-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 break-words">
              {topicTitle}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              <Tag color="blue" className="text-xs font-bold">{className}</Tag>
            </div>
          </div>
          <div className="text-center bg-gray-50 rounded-lg p-4 sm:bg-transparent sm:p-0">
            <div className={`text-3xl sm:text-4xl font-bold ${getRatingColor(avgRating)}`}>
              {avgRating}
            </div>
            <Rate disabled defaultValue={avgRating} className="text-base sm:text-lg" />
            <div className="text-xs sm:text-sm text-gray-500">
              Based on {cohortReviews?.length || 0} reviews
            </div>
          </div>
        </div>


        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="bg-white rounded-lg p-3 sm:bg-transparent sm:p-0">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{studentsEnrolled}</div>
              <div className="text-gray-600 text-sm">Total Students</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:bg-transparent sm:p-0">
              <div className="text-xl sm:text-2xl font-bold text-green-600">{cohortSummary?.total_reviews}</div>
              <div className="text-gray-600 text-sm">Total Reviews</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:bg-transparent sm:p-0">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">
                {Math.round((cohortSummary?.total_reviews / studentsEnrolled) * 100)}%
              </div>
              <div className="text-gray-600 text-sm">Response Rate</div>
            </div>
          </div>
        </Card>

        <div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
            {cohortReviews?.map((review) => (
              <Card
                key={review.id}
                className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500"
                styles={{ body: { padding: '16px sm:20px' } }}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Avatar
                    src={review.student_profile_picture && `${img_base_url + review.student_profile_picture}`}
                    size={window.innerWidth < 640 ? 36 : 48}
                    icon={<UserOutlined />}
                    className="bg-gradient-to-r flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{review.student_name}</h3>
                      </div>
                      <div className="text-right flex items-center gap-2 flex-shrink-0">
                        <Rate disabled defaultValue={review.rating} className="text-xs sm:text-sm" />
                        <div className={`font-bold text-lg ${getRatingColor(review.rating)}`}>
                          {review.rating}.0
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-2 sm:p-3 rounded-lg mb-3 text-xs sm:text-sm">
                      "{review.comment}"
                    </p>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-gray-500 gap-2">
                      <span>{formatDateTime(review.created_at)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

          </div>
          {cohortReviews?.length == 0 && <div className='flex flex-col w-full justify-center items-center'><Empty description={'This class has not been rated/reviewed yet!'} /></div>}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Review Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4">Monitor your teaching performance and student feedback</p>

          {/* Quick Stats */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6">
            <div className="text-center bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                {Number(instructorSummary?.average_rating).toFixed(2)}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Avg. Instructor Rating</div>
            </div>

            <div className="text-center bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">{InstructorCohorts?.length}</div>
              <div className="text-xs sm:text-sm text-gray-500">Active Classes</div>
            </div>
          </div>
        </div>

        {/* Custom Tab Navigation */}
        <div className="bg-white p-3 sm:p-4 lg:p-6">
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex w-full">
              <button
                onClick={viewInstructorReviews}
                className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-t-lg transition-all duration-200 ${activeTab === 'instructor_reviews'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <LuMessageSquare />
                <span className="hidden sm:inline">Instructor Reviews</span>
                <span className="sm:hidden">Instructor</span>
                <Badge
                  count={instructorReviews?.length}
                  className="ml-1 sm:ml-2"
                  style={{
                    backgroundColor: activeTab === 'instructor_reviews' ? '#1890ff' : '#d9d9d9',
                    color: activeTab === 'instructor_reviews' ? 'white' : '#666'
                  }}
                />
              </button>
              <button
                onClick={viewClassReviews}
                className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-t-lg transition-all duration-200 ${activeTab === 'class_reviews'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <LuBook />
                <span className="hidden sm:inline">Class Reviews</span>
                <span className="sm:hidden">Classes</span>
                <Badge
                  count={reviewCount}
                  className="ml-1 sm:ml-2"
                  style={{
                    backgroundColor: activeTab === 'class_reviews' ? '#1890ff' : '#d9d9d9',
                    color: activeTab === 'class_reviews' ? 'white' : '#666'
                  }}
                />
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-4 sm:space-y-6">
            {activeTab === 'instructor_reviews' && renderStudentReviews()}
            {activeTab === 'class_reviews' && renderClassPerformance()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsAndRatings;