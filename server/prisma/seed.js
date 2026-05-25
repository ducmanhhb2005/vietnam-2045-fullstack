const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.journeySession.deleteMany();
  await prisma.quizOption.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.choice.deleteMany();
  await prisma.scenario.deleteMany();
  await prisma.resultProfile.deleteMany();
  await prisma.role.deleteMany();

  await prisma.role.createMany({
    data: [
      {
        slug: 'student-digital',
        title: 'Sinh viên thời đại số',
        subtitle: 'Học tập - AI - công nghệ',
        description: 'Chủ động học tập, quan tâm công nghệ và thích nghi với chuyển đổi số.',
        icon: '💻',
        accent: 'from-indigo-500 to-violet-600'
      },
      {
        slug: 'startup-young',
        title: 'Startup trẻ sáng tạo',
        subtitle: 'Đổi mới - khởi nghiệp',
        description: 'Yêu thích đổi mới sáng tạo, dám thử nghiệm ý tưởng mới để tạo giá trị cho cộng đồng.',
        icon: '🚀',
        accent: 'from-amber-400 to-orange-600'
      },
      {
        slug: 'green-citizen',
        title: 'Công dân xanh',
        subtitle: 'Bền vững - trách nhiệm',
        description: 'Quan tâm môi trường, hướng tới phát triển bền vững và bảo vệ tương lai.',
        icon: '🌱',
        accent: 'from-emerald-400 to-teal-600'
      },
      {
        slug: 'youth-union',
        title: 'Đoàn viên tiên phong',
        subtitle: 'Cộng đồng - lan tỏa',
        description: 'Có trách nhiệm xã hội, quan tâm cộng đồng và lan tỏa giá trị tích cực.',
        icon: '🔥',
        accent: 'from-rose-500 to-red-600'
      }
    ]
  });

  const scenarios = [
    {
      order: 1,
      title: 'AI đang thay đổi tương lai',
      prompt: 'Nhà trường mở khóa học kỹ năng AI và công nghệ số. Bạn sẽ lựa chọn thế nào?',
      context: 'Bạn là một sinh viên đang đứng trước cơ hội nâng cấp năng lực số trong bối cảnh AI thay đổi mạnh mẽ thị trường việc làm.',
      icon: '🤖',
      choices: [
        {
          label: 'A',
          text: 'Chủ động tham gia khóa học, tìm hiểu AI và công nghệ mới.',
          feedbackTitle: 'Rất tuyệt!',
          feedback: 'Đại hội XIV xác định khoa học công nghệ, đổi mới sáng tạo và chuyển đổi số là động lực quan trọng cho phát triển đất nước.',
          scoreType: 'digital',
          scoreValue: 10
        },
        {
          label: 'B',
          text: 'Không quan tâm vì nghĩ rằng hiện tại chưa cần thiết.',
          feedbackTitle: 'Hãy cân nhắc lại!',
          feedback: 'Trong thời đại số, thiếu kỹ năng công nghệ có thể khiến người trẻ tụt lại phía sau và bỏ lỡ nhiều cơ hội phát triển.',
          scoreType: null,
          scoreValue: 0
        }
      ]
    },
    {
      order: 2,
      title: 'Khởi nghiệp bằng đổi mới sáng tạo',
      prompt: 'Nhóm bạn muốn xây dựng ứng dụng AI hỗ trợ học sinh vùng sâu vùng xa. Bạn sẽ làm gì?',
      context: 'Ý tưởng còn non trẻ, nguồn lực còn hạn chế, nhưng nếu thành công có thể tạo ra tác động xã hội tích cực.',
      icon: '🚀',
      choices: [
        {
          label: 'A',
          text: 'Tiếp tục nghiên cứu, thử nghiệm dự án và tìm kiếm cố vấn.',
          feedbackTitle: 'Tinh thần sáng tạo!',
          feedback: 'Đổi mới sáng tạo là một trong những động lực quan trọng của phát triển đất nước. Những ý tưởng nhỏ có thể mở ra giá trị lớn.',
          scoreType: 'innovation',
          scoreValue: 10
        },
        {
          label: 'B',
          text: 'Từ bỏ vì sợ thất bại và sợ mất thời gian.',
          feedbackTitle: 'Đừng ngại thử sức!',
          feedback: 'Nhiều thành tựu lớn bắt đầu từ những ý tưởng nhỏ và tinh thần dám nghĩ, dám làm, dám chịu trách nhiệm.',
          scoreType: null,
          scoreValue: 0
        }
      ]
    },
    {
      order: 3,
      title: 'Thông tin trên mạng xã hội',
      prompt: 'Bạn bắt gặp nhiều thông tin sai lệch liên quan đến chính sách phát triển khoa học công nghệ. Bạn xử lý thế nào?',
      context: 'Không gian mạng là nơi lan truyền thông tin rất nhanh, vì vậy mỗi công dân số cần có bản lĩnh và trách nhiệm.',
      icon: '🌐',
      choices: [
        {
          label: 'A',
          text: 'Kiểm chứng thông tin từ nguồn chính thống trước khi chia sẻ.',
          feedbackTitle: 'Lựa chọn có trách nhiệm!',
          feedback: 'Thanh niên cần có trách nhiệm và bản lĩnh trên không gian mạng, biết kiểm chứng và lan tỏa thông tin tích cực.',
          scoreType: 'pioneer',
          scoreValue: 10
        },
        {
          label: 'B',
          text: 'Chia sẻ theo số đông vì thấy nhiều người cũng đăng.',
          feedbackTitle: 'Cẩn thận với hiệu ứng đám đông!',
          feedback: 'Thông tin sai lệch có thể gây ảnh hưởng tiêu cực đến cộng đồng. Chia sẻ có trách nhiệm cũng là hành động công dân số.',
          scoreType: null,
          scoreValue: 0
        }
      ]
    },
    {
      order: 4,
      title: 'Nghiên cứu khoa học sinh viên',
      prompt: 'Nhà trường tổ chức cuộc thi nghiên cứu khoa học về AI và chuyển đổi số. Bạn sẽ tham gia chứ?',
      context: 'Đây là cơ hội để rèn luyện tư duy nghiên cứu, kỹ năng giải quyết vấn đề và năng lực học tập suốt đời.',
      icon: '📚',
      choices: [
        {
          label: 'A',
          text: 'Chủ động tham gia để học hỏi, rèn luyện và đóng góp ý tưởng.',
          feedbackTitle: 'Tinh thần tri thức!',
          feedback: 'Phát triển nguồn nhân lực chất lượng cao là yêu cầu quan trọng trong thời đại mới. Học tập và sáng tạo là nền tảng của tương lai.',
          scoreType: 'knowledge',
          scoreValue: 10
        },
        {
          label: 'B',
          text: 'Chỉ học để đủ điểm, không muốn tham gia thêm hoạt động.',
          feedbackTitle: 'Bạn vẫn còn nhiều tiềm năng!',
          feedback: 'Tinh thần học tập và sáng tạo giúp người trẻ phát triển trong thời đại toàn cầu hóa. Hãy thử bước ra khỏi vùng an toàn.',
          scoreType: null,
          scoreValue: 0
        }
      ]
    }
  ];

  for (const scenario of scenarios) {
    await prisma.scenario.create({
      data: {
        order: scenario.order,
        title: scenario.title,
        prompt: scenario.prompt,
        context: scenario.context,
        icon: scenario.icon,
        choices: {
          create: scenario.choices
        }
      }
    });
  }

  const quizQuestions = [
    {
      order: 1,
      text: 'Đại hội XIV xác định đâu là động lực quan trọng của phát triển đất nước?',
      explanationCorrect: 'Chính xác! Khoa học công nghệ, đổi mới sáng tạo và chuyển đổi số là động lực quan trọng trong giai đoạn phát triển mới.',
      explanationWrong: 'Hãy tìm hiểu thêm về vai trò của khoa học công nghệ, đổi mới sáng tạo và chuyển đổi số trong phát triển đất nước.',
      options: [
        { label: 'A', text: 'Khoa học công nghệ, đổi mới sáng tạo và chuyển đổi số', isCorrect: true },
        { label: 'B', text: 'Khai thác tài nguyên là chủ yếu', isCorrect: false },
        { label: 'C', text: 'Chỉ dựa vào vốn đầu tư nước ngoài', isCorrect: false },
        { label: 'D', text: 'Giữ nguyên cách làm cũ', isCorrect: false }
      ]
    },
    {
      order: 2,
      text: 'Trong thời đại số, thanh niên nên làm gì để không bị tụt lại phía sau?',
      explanationCorrect: 'Đúng rồi! Chủ động học tập, sáng tạo và thích ứng với công nghệ là năng lực rất quan trọng của thanh niên.',
      explanationWrong: 'Thanh niên cần chủ động học tập, rèn luyện kỹ năng số và thích ứng với thay đổi.',
      options: [
        { label: 'A', text: 'Chủ động học tập, sáng tạo và rèn kỹ năng số', isCorrect: true },
        { label: 'B', text: 'Chỉ học đủ để qua môn', isCorrect: false },
        { label: 'C', text: 'Tránh sử dụng công nghệ mới', isCorrect: false },
        { label: 'D', text: 'Không cần quan tâm đến chuyển đổi số', isCorrect: false }
      ]
    },
    {
      order: 3,
      text: 'Khi gặp thông tin sai lệch trên mạng xã hội, hành động phù hợp nhất là gì?',
      explanationCorrect: 'Chính xác! Kiểm chứng nguồn tin là biểu hiện của bản lĩnh và trách nhiệm công dân số.',
      explanationWrong: 'Bạn nên kiểm chứng thông tin từ nguồn chính thống trước khi tin hoặc chia sẻ.',
      options: [
        { label: 'A', text: 'Kiểm chứng thông tin từ nguồn chính thống', isCorrect: true },
        { label: 'B', text: 'Chia sẻ ngay vì thấy đang hot', isCorrect: false },
        { label: 'C', text: 'Bình luận công kích người khác', isCorrect: false },
        { label: 'D', text: 'Tin theo số đông mà không kiểm tra', isCorrect: false }
      ]
    },
    {
      order: 4,
      text: 'Phát triển nguồn nhân lực chất lượng cao có ý nghĩa gì?',
      explanationCorrect: 'Đúng! Nguồn nhân lực chất lượng cao giúp nâng cao năng lực cạnh tranh và tạo nền tảng phát triển bền vững.',
      explanationWrong: 'Nguồn nhân lực chất lượng cao là yếu tố quan trọng để nâng cao năng lực cạnh tranh của đất nước.',
      options: [
        { label: 'A', text: 'Nâng cao năng lực cạnh tranh và chất lượng phát triển', isCorrect: true },
        { label: 'B', text: 'Làm giảm vai trò học tập của sinh viên', isCorrect: false },
        { label: 'C', text: 'Chỉ cần thiết với doanh nghiệp lớn', isCorrect: false },
        { label: 'D', text: 'Không liên quan đến tương lai đất nước', isCorrect: false }
      ]
    },
    {
      order: 5,
      text: 'Chuyển đổi số giúp ích gì cho xã hội?',
      explanationCorrect: 'Tốt lắm! Chuyển đổi số góp phần đổi mới cách học tập, làm việc, quản trị và phục vụ người dân.',
      explanationWrong: 'Chuyển đổi số giúp đổi mới phương thức học tập, làm việc, quản trị và nâng cao hiệu quả phục vụ xã hội.',
      options: [
        { label: 'A', text: 'Đổi mới học tập, làm việc, quản trị và phục vụ người dân', isCorrect: true },
        { label: 'B', text: 'Làm mọi người không cần học nữa', isCorrect: false },
        { label: 'C', text: 'Chỉ dùng để giải trí', isCorrect: false },
        { label: 'D', text: 'Không có tác động đến phát triển quốc gia', isCorrect: false }
      ]
    }
  ];

  for (const question of quizQuestions) {
    await prisma.quizQuestion.create({
      data: {
        order: question.order,
        text: question.text,
        explanationCorrect: question.explanationCorrect,
        explanationWrong: question.explanationWrong,
        options: {
          create: question.options
        }
      }
    });
  }

  await prisma.resultProfile.createMany({
    data: [
      {
        slug: 'cong-dan-so-tien-phong',
        title: 'Công dân số tiên phong',
        subtitle: 'Bạn sẵn sàng làm chủ công nghệ và lan tỏa tư duy số.',
        badge: 'CÔNG DÂN SỐ TIÊN PHONG',
        headline: 'Bạn là người chủ động bước vào kỷ nguyên số.',
        description: 'Bạn có tinh thần học hỏi, biết tận dụng công nghệ, AI và chuyển đổi số để nâng cao năng lực bản thân và đóng góp cho cộng đồng.',
        recommendation: 'Hãy tiếp tục học kỹ năng AI, dữ liệu, an toàn số và biến tri thức công nghệ thành hành động có ích.',
        gradient: 'from-blue-600 via-indigo-600 to-violet-700',
        icon: '🤖'
      },
      {
        slug: 'thanh-nien-sang-tao',
        title: 'Thanh niên sáng tạo',
        subtitle: 'Bạn dám nghĩ, dám làm và dám thử nghiệm ý tưởng mới.',
        badge: 'THANH NIÊN SÁNG TẠO',
        headline: 'Bạn là nguồn năng lượng đổi mới của tương lai.',
        description: 'Bạn nhìn thấy cơ hội trong vấn đề xã hội, có tinh thần khởi nghiệp và mong muốn tạo ra giá trị tích cực từ đổi mới sáng tạo.',
        recommendation: 'Hãy thử tham gia cuộc thi ý tưởng, nghiên cứu khoa học, hackathon hoặc dự án cộng đồng để biến ý tưởng thành sản phẩm.',
        gradient: 'from-orange-500 via-amber-500 to-yellow-500',
        icon: '🚀'
      },
      {
        slug: 'doan-vien-trach-nhiem',
        title: 'Đoàn viên trách nhiệm',
        subtitle: 'Bạn quan tâm cộng đồng, có bản lĩnh và biết lan tỏa điều đúng.',
        badge: 'ĐOÀN VIÊN TRÁCH NHIỆM',
        headline: 'Bạn là người giữ nhịp tích cực cho cộng đồng.',
        description: 'Bạn có ý thức trách nhiệm xã hội, biết kiểm chứng thông tin và sẵn sàng góp phần xây dựng môi trường số lành mạnh.',
        recommendation: 'Hãy tiếp tục tham gia hoạt động Đoàn - Hội, truyền thông tích cực và hỗ trợ bạn bè nâng cao năng lực công dân số.',
        gradient: 'from-red-600 via-rose-600 to-pink-600',
        icon: '🔥'
      },
      {
        slug: 'cong-dan-tri-thuc',
        title: 'Công dân tri thức',
        subtitle: 'Bạn coi học tập, nghiên cứu và năng lực chuyên môn là nền tảng phát triển.',
        badge: 'CÔNG DÂN TRI THỨC',
        headline: 'Bạn đang xây dựng tương lai bằng tri thức.',
        description: 'Bạn có tinh thần học tập nghiêm túc, chủ động nghiên cứu và hiểu rằng nguồn nhân lực chất lượng cao là yếu tố then chốt của đất nước.',
        recommendation: 'Hãy duy trì thói quen học tập suốt đời, đọc tài liệu chính thống và tham gia các đề tài nghiên cứu thực tế.',
        gradient: 'from-sky-600 via-cyan-600 to-teal-600',
        icon: '📚'
      },
      {
        slug: 'cong-dan-xanh-trach-nhiem',
        title: 'Công dân xanh trách nhiệm',
        subtitle: 'Bạn hướng tới phát triển bền vững và biết cân bằng lợi ích cá nhân với tương lai chung.',
        badge: 'CÔNG DÂN XANH TRÁCH NHIỆM',
        headline: 'Bạn chọn tương lai bền vững cho Việt Nam 2045.',
        description: 'Bạn quan tâm môi trường, phát triển xanh và hiểu rằng đổi mới cần đi đôi với trách nhiệm xã hội.',
        recommendation: 'Hãy bắt đầu bằng những hành động nhỏ: tiết kiệm năng lượng, tiêu dùng xanh, lan tỏa lối sống bền vững.',
        gradient: 'from-emerald-500 via-green-600 to-lime-600',
        icon: '🌱'
      }
    ]
  });

  console.log('Seed completed: roles, scenarios, quiz questions and result profiles created.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
