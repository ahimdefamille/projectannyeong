const Module1GrammarLesson1 = {
  en: `
    <h1>Korean Grammar Lesson: Greetings (인사)</h1>

    <h2>1. Basic Greetings in Korean</h2>
    <p>In Korean, there are various ways to greet depending on the time, situation, and the formality of the conversation. Here are some common greetings you’ll use every day:</p>

    <h3>1.1. 안녕하세요 (Annyeonghaseyo)</h3>
    <p>This is the most common and polite way to say “Hello” in Korean. It can be used in almost any situation. It's polite and neutral.</p>
    <ul>
        <li><strong>Grammar Breakdown:</strong></li>
        <ul>
            <li><strong>안녕</strong> (annyeong) = "peace," "well-being"</li>
            <li><strong>하세요</strong> (haseyo) = polite form of "to do"</li>
        </ul>
        <li>So, it’s like saying, "Are you well?" in a polite way.</li>
    </ul>
    <div class="example">
        <strong>Example:</strong><br>
        A: 안녕하세요? (Annyeonghaseyo?) — <em>Hello, how are you?</em><br>
        B: 네, 안녕하세요! (Ne, annyeonghaseyo!) — <em>Yes, hello!</em>
    </div>

    <h3>1.2. 안녕 (Annyeong)</h3>
    <p>This is an informal way to say “Hello” or “Hi.” You can use it with friends or people younger than you. It literally means "peace."</p>
    <div class="example">
        <strong>Example:</strong><br>
        A: 안녕! (Annyeong!) — <em>Hi!</em><br>
        B: 안녕! (Annyeong!) — <em>Hi!</em>
    </div>

    <h3>1.3. 안녕히 가세요 (Annyeonghi gaseyo) vs. 안녕히 계세요 (Annyeonghi gyeseyo)</h3>
    <p>These are phrases used when saying goodbye, but the use depends on who is leaving and who is staying:</p>
    <ul>
        <li><strong>안녕히 가세요 (Annyeonghi gaseyo)</strong> — <em>Goodbye</em> (when the other person is leaving)</li>
        <ul>
            <li>"가세요" comes from "가다" (gada), meaning “to go.” You say this when someone else is leaving.</li>
        </ul>
        <div class="example">
            <strong>Example:</strong><br>
            A: 안녕히 가세요! (Annyeonghi gaseyo!) — <em>Goodbye!</em> (said to someone leaving)
        </div>
        <li><strong>안녕히 계세요 (Annyeonghi gyeseyo)</strong> — <em>Goodbye</em> (when you are leaving, and the other person is staying)</li>
        <ul>
            <li>"계세요" comes from "계시다" (gyesida), meaning "to stay." You say this when you are leaving and the other person is staying.</li>
        </ul>
        <div class="example">
            <strong>Example:</strong><br>
            A: 안녕히 계세요! (Annyeonghi gyeseyo!) — <em>Goodbye!</em> (said to someone staying)
        </div>
    </ul>

    <h2>2. Formal vs. Informal Speech</h2>
    <p>Korean has a distinction between formal and informal language. When you greet someone in Korean, it's important to consider the level of politeness:</p>
    <ul>
        <li><strong>Formal:</strong></li>
        <ul>
            <li>안녕하세요 (Annyeonghaseyo) — <em>Hello</em> (polite)</li>
            <li>안녕히 가세요 (Annyeonghi gaseyo) — <em>Goodbye</em> (polite)</li>
            <li>안녕히 계세요 (Annyeonghi gyeseyo) — <em>Goodbye</em> (polite)</li>
        </ul>
        <li><strong>Informal:</strong></li>
        <ul>
            <li>안녕 (Annyeong) — <em>Hi</em> (informal)</li>
            <li>잘 가 (Jal ga) — <em>Bye</em> (informal, said to someone leaving)</li>
            <li>잘 있어 (Jal isseo) — <em>Bye</em> (informal, said to someone staying)</li>
        </ul>
    </ul>

    <h2>3. Saying "How are you?" in Korean</h2>
    <p>Though Koreans don't often ask "How are you?" in everyday greetings, if you want to ask, you can use:</p>
    <ul>
        <li><strong>잘 지내세요? (Jal jinaeseyo?)</strong> — <em>How are you?</em> (polite)</li>
        <li><strong>잘 지냈어요? (Jal jinaesseoyo?)</strong> — <em>Have you been well?</em> (polite, past tense)</li>
    </ul>
    <div class="example">
        <strong>Example:</strong><br>
        A: 잘 지내세요? (Jal jinaeseyo?) — <em>How are you?</em><br>
        B: 네, 잘 지내요! (Ne, jal jinaeyo!) — <em>Yes, I'm doing well!</em>
    </div>

    <h2>4. Practice Conversations</h2>
    <p>Let’s combine everything into short conversations.</p>

    <h3>Formal Conversation:</h3>
    <div class="example">
        A: 안녕하세요! (Annyeonghaseyo!) — <em>Hello!</em><br>
        B: 안녕하세요! 잘 지내세요? (Annyeonghaseyo! Jal jinaeseyo?) — <em>Hello! How are you?</em><br>
        A: 네, 잘 지내요! (Ne, jal jinaeyo!) — <em>Yes, I'm doing well!</em>
    </div>

    <h3>Informal Conversation:</h3>
    <div class="example">
        A: 안녕! (Annyeong!) — <em>Hi!</em><br>
        B: 안녕! 잘 있었어? (Annyeong! Jal isseosseo?) — <em>Hi! How have you been?</em><br>
        A: 응, 잘 있었어! (Eung, jal isseosseo!) — <em>Yeah, I’ve been good!</em>
    </div>
`,

vi: `
<h1>Ngữ pháp tiếng Hàn: Chào hỏi (인사)</h1>

<h2>1. Những câu chào cơ bản trong tiếng Hàn</h2>
<p>Trong tiếng Hàn, có nhiều cách chào khác nhau tùy thuộc vào thời gian, tình huống và mức độ trang trọng của cuộc trò chuyện. Dưới đây là một số câu chào phổ biến mà bạn có thể sử dụng hàng ngày:</p>

<h3>1.1. 안녕하세요 (Annyeonghaseyo)</h3>
<p>Đây là cách chào lịch sự và phổ biến nhất, có nghĩa là “Xin chào.” Bạn có thể dùng nó trong hầu hết mọi tình huống, vì câu này vừa lịch sự vừa trung lập.</p>
<ul>
    <li><strong>Phân tích ngữ pháp:</strong></li>
    <ul>
        <li><strong>안녕</strong> (annyeong) = "hòa bình," "sự an lành"</li>
        <li><strong>하세요</strong> (haseyo) = hình thức lịch sự của "làm"</li>
    </ul>
    <li>Câu này có thể hiểu như là hỏi, "Bạn có khỏe không?" một cách lịch sự.</li>
</ul>
<div class="example">
    <strong>Ví dụ:</strong><br>
    A: 안녕하세요? (Annyeonghaseyo?) — <em>Xin chào, bạn khỏe không?</em><br>
    B: 네, 안녕하세요! (Ne, annyeonghaseyo!) — <em>Có, xin chào!</em>
</div>

<h3>1.2. 안녕 (Annyeong)</h3>
<p>Cách chào này không chính thức, có nghĩa là “Xin chào” hoặc “Chào.” Bạn có thể sử dụng với bạn bè hoặc những người nhỏ tuổi hơn. Từ này mang nghĩa "hòa bình."</p>
<div class="example">
    <strong>Ví dụ:</strong><br>
    A: 안녕! (Annyeong!) — <em>Chào!</em><br>
    B: 안녕! (Annyeong!) — <em>Chào!</em>
</div>

<h3>1.3. 안녕히 가세요 (Annyeonghi gaseyo) và 안녕히 계세요 (Annyeonghi gyeseyo)</h3>
<p>Đây là các câu chào tạm biệt, tùy thuộc vào ai đang rời đi và ai đang ở lại:</p>
<ul>
    <li><strong>안녕히 가세요 (Annyeonghi gaseyo)</strong> — <em>Tạm biệt</em> (nói với người ra đi)</li>
    <ul>
        <li>"가세요" xuất phát từ "가다" (gada), có nghĩa là “đi.” Bạn dùng câu này khi người khác ra về.</li>
    </ul>
    <div class="example">
        <strong>Ví dụ:</strong><br>
        A: 안녕히 가세요! (Annyeonghi gaseyo!) — <em>Tạm biệt!</em> (nói với ai đó ra về)
    </div>
    <li><strong>안녕히 계세요 (Annyeonghi gyeseyo)</strong> — <em>Tạm biệt</em> (nói khi bạn ra về và người kia ở lại)</li>
    <ul>
        <li>"계세요" xuất phát từ "계시다" (gyesida), có nghĩa là "ở lại." Bạn nói câu này khi mình rời đi.</li>
    </ul>
    <div class="example">
        <strong>Ví dụ:</strong><br>
        A: 안녕히 계세요! (Annyeonghi gyeseyo!) — <em>Tạm biệt!</em> (nói với ai đó ở lại)
    </div>
</ul>

<h2>2. Ngôn ngữ trang trọng và không trang trọng</h2>
<p>Tiếng Hàn có sự phân biệt giữa ngôn ngữ trang trọng và không trang trọng. Khi chào ai đó, bạn cần chú ý đến mức độ lịch sự:</p>
<ul>
    <li><strong>Trang trọng:</strong></li>
    <ul>
        <li>안녕하세요 (Annyeonghaseyo) — <em>Xin chào</em> (lịch sự)</li>
        <li>안녕히 가세요 (Annyeonghi gaseyo) — <em>Tạm biệt</em> (lịch sự)</li>
        <li>안녕히 계세요 (Annyeonghi gyeseyo) — <em>Tạm biệt</em> (lịch sự)</li>
    </ul>
    <li><strong>Không trang trọng:</strong></li>
    <ul>
        <li>안녕 (Annyeong) — <em>Chào</em> (không chính thức)</li>
        <li>잘 가 (Jal ga) — <em>Tạm biệt</em> (không chính thức, nói với người ra đi)</li>
        <li>잘 있어 (Jal isseo) — <em>Tạm biệt</em> (không chính thức, nói với người ở lại)</li>
    </ul>
</ul>

<h2>3. Hỏi "Bạn khỏe không?" bằng tiếng Hàn</h2>
<p>Mặc dù người Hàn Quốc không thường hỏi "Bạn khỏe không?" trong các cuộc chào hỏi hàng ngày, nhưng nếu bạn muốn, có thể dùng:</p>
<ul>
    <li><strong>잘 지내세요? (Jal jinaeseyo?)</strong> — <em>Bạn khỏe không?</em> (lịch sự)</li>
    <li><strong>잘 지냈어요? (Jal jinaesseoyo?)</strong> — <em>Bạn có khỏe không?</em> (lịch sự, thì quá khứ)</li>
</ul>
<div class="example">
    <strong>Ví dụ:</strong><br>
    A: 잘 지내세요? (Jal jinaeseyo?) — <em>Bạn khỏe không?</em><br>
    B: 네, 잘 지내요! (Ne, jal jinaeyo!) — <em>Có, tôi khỏe!</em>
</div>

<h2>4. Thực hành hội thoại</h2>
<p>Hãy kết hợp mọi thứ thành các cuộc hội thoại ngắn.</p>

<h3>Cuộc hội thoại trang trọng:</h3>
<div class="example">
    A: 안녕하세요! (Annyeonghaseyo!) — <em>Xin chào!</em><br>
    B: 안녕하세요! 잘 지내세요? (Annyeonghaseyo! Jal jinaeseyo?) — <em>Xin chào! Bạn khỏe không?</em><br>
    A: 네, 잘 지내요! (Ne, jal jinaeyo!) — <em>Có, tôi khỏe!</em>
</div>

<h3>Cuộc hội thoại không trang trọng:</h3>
<div class="example">
    A: 안녕! (Annyeong!) — <em>Chào!</em><br>
    B: 안녕! 잘 있었어? (Annyeong! Jal isseosseo?) — <em>Chào! Bạn có khỏe không?</em><br>
    A: 응, 잘 있었어! (Eung, jal isseosseo!) — <em>Ừ, tôi khỏe!</em>
</div>

`};

export default Module1GrammarLesson1;