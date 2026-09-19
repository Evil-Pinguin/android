/* ===== Трек "Android Studio": юниты, карточки, упражнения, тесты ===== */
const ANDROID_UNITS = [
{
  id: "a1",
  title: "Старт",
  subtitle: "Android и Android Studio",
  icon: "🚀",
  color: "#58cc02",
  cards: [
    { t: "Android", d: "Операционная система от Google для смартфонов, планшетов, часов и ТВ. Приложения для неё пишут в основном на языке Kotlin.", e: "// Версии Android:\n// 13 (API 33), 14 (API 34), 15 (API 35)", tip: "Kotlin — официальный язык Android-разработки с 2019 года." },
    { t: "Android Studio", d: "Официальная бесплатная среда разработки (IDE) для Android. В ней пишут код, рисуют экраны и запускают приложение.", e: "Android Studio = IntelliJ IDEA + Android SDK", tip: "Скачивается с сайта developer.android.com — ставь последнюю стабильную версию." },
    { t: "SDK и API Level", d: "SDK — набор инструментов для разработки. API Level — номер версии Android: чем выше число, тем новее функции.", e: "minSdk = 26     // станет на Android 8.0 и новее\ntargetSdk = 34  // оптимизация под Android 14", tip: "minSdk — самые старые телефоны, которые поддерживает твоё приложение." },
    { t: "Первый проект", d: "Создаётся через New Project → Empty Activity. Сразу получаешь рабочее приложение с одним экраном.", e: "MyApp/\n├── manifests/  (манифест)\n├── java/       (код Kotlin)\n└── res/        (картинки, тексты, экраны)", tip: "Имя пакета пишут наоборот: com.myname.myapp." },
    { t: "AndroidManifest.xml", d: "«Паспорт» приложения: название, иконка, главный экран и разрешения (интернет, камера и т.д.).", e: '<activity android:name=".MainActivity">\n    <intent-filter> ... </intent-filter>\n</activity>', tip: "Экран, не записанный в манифест, никогда не запустится." },
    { t: "Gradle", d: "Система сборки: скачивает библиотеки и собирает приложение в APK. Настройки — в файлах build.gradle.kts.", e: 'dependencies {\n    implementation("androidx.core:core-ktx:1.12.0")\n}', tip: "После изменения Gradle-файлов жми «Sync Now»." },
    { t: "Эмулятор (AVD)", d: "Виртуальный телефон прямо на компьютере. Запуск приложения — зелёная кнопка Run ▶.", e: "Run ▶ → выбрать устройство →\nприложение ставится и открывается", tip: "Первый запуск эмулятора долгий — это нормально." }
  ],
  drills: [
    { t: "order", q: "Собери по порядку запуск первого приложения", items: ["Открыть Android Studio", "New Project → Empty Activity", "Нажать Finish", "Нажать Run ▶"], explain: "Именно так рождается первое приложение." },
    { t: "fill", q: "Какое значение разрешает установку на Android 8.0 и новее?", code: "minSdk = ___", options: ["26", "34", "8", "15"], answer: 0, explain: "API 26 = Android 8.0." },
    { t: "choice", q: "Где лежат тексты, картинки и экраны?", options: ["В папке res/", "В папке java/", "В файле Gradle", "В эмуляторе"], answer: 0, explain: "res/ — все ресурсы, java/ — код." },
    { t: "choice", q: "Что делает кнопка Run ▶?", options: ["Собирает и запускает приложение", "Удаляет приложение", "Открывает настройки", "Создаёт эмулятор"], answer: 0, explain: "Run собирает APK и ставит его на устройство." },
    { t: "tf", q: "Эмулятор — это настоящий телефон, подключённый по USB.", answer: false, explain: "Эмулятор — виртуальный телефон внутри компьютера." }
  ],
  test: [
    { t: "choice", q: "Что такое Android?", options: ["ОС от Google для смартфонов и других устройств", "Язык программирования", "Фирма-производитель телефонов", "Приложение для звонков"], answer: 0, explain: "Android — операционная система от Google." },
    { t: "choice", q: "Официальный язык Android-разработки:", options: ["Kotlin", "Python", "C#", "JavaScript"], answer: 0, explain: "С 2019 года Google рекомендует Kotlin." },
    { t: "choice", q: "Что такое Android Studio?", options: ["Среда разработки для Android", "Музыкальный редактор", "Игра", "Антивирус"], answer: 0, explain: "IDE, в которой создают Android-приложения." },
    { t: "fill", q: "Файл-«паспорт» приложения называется…", code: "___", options: ["AndroidManifest.xml", "MainActivity.kt", "build.gradle.kts", "strings.xml"], answer: 0, explain: "В манифесте — экраны, иконка и разрешения." },
    { t: "choice", q: "За что отвечает Gradle?", options: ["Сборка приложения и библиотеки", "Рисование кнопок", "Хранение паролей", "Отправку SMS"], answer: 0, explain: "Gradle собирает проект и тянет зависимости." },
    { t: "tf", q: "Первый проект создают через New Project → Empty Activity.", answer: true, explain: "Да, это стандартный старт." },
    { t: "choice", q: "Что означает minSdk = 26?", options: ["Приложение встанет на Android 8.0 и новее", "Приложению нужно 26 МБ памяти", "Версия приложения — 26", "Нужно 26 разрешений"], answer: 0, explain: "API 26 соответствует Android 8.0." },
    { t: "tf", q: "Код на Kotlin в проекте обычно лежит в папке java/ (или kotlin/).", answer: true, explain: "Да, а ресурсы — в res/." }
  ]
},
{
  id: "a2",
  title: "Интерфейс",
  subtitle: "Activity, View и экраны",
  icon: "🎨",
  color: "#1cb0f6",
  cards: [
    { t: "Activity", d: "Один экран приложения. Каждый экран — это класс, наследник Activity.", e: "class MainActivity : AppCompatActivity() {\n    override fun onCreate(...) {\n        super.onCreate(...)\n        setContentView(R.layout.activity_main)\n    }\n}", tip: "Метод onCreate вызывается при создании экрана." },
    { t: "Layout (макет)", d: "XML-файл с описанием интерфейса: какие элементы есть и где они стоят на экране.", e: '<TextView\n    android:layout_width="wrap_content"\n    android:layout_height="wrap_content"\n    android:text="Привет!" />', tip: "Макеты лежат в папке res/layout/." },
    { t: "View и ViewGroup", d: "View — отдельный элемент (кнопка, текст). ViewGroup — контейнер, внутри которого лежат элементы.", e: "TextView, Button, ImageView — это View\nLinearLayout — это ViewGroup", tip: "Всё, что видишь на экране, — это View." },
    { t: "TextView", d: "Элемент для показа текста. Самый частый гость на экране.", e: 'android:text="Привет, мир!"\nandroid:textSize="20sp"', tip: "Размер текста всегда задавай в sp." },
    { t: "Button и клик", d: "Кнопка. Реакцию на нажатие задаём через слушатель кликов в коде.", e: "button.setOnClickListener {\n    textView.text = \"Нажата!\"\n}", tip: "findViewById связывает код с элементом из XML-разметки." },
    { t: "LinearLayout", d: "Контейнер, который кладёт элементы в линию: вертикально или горизонтально.", e: 'android:orientation="vertical"', tip: "Простой и понятный — идеален для первых экранов." },
    { t: "ConstraintLayout", d: "Гибкий контейнер: элементы привязываются друг к другу и к краям связями-ограничениями.", e: "app:layout_constraintTop_toTopOf=\"parent\"\napp:layout_constraintStart_toStartOf=\"parent\"", tip: "Основной контейнер в современных приложениях." },
    { t: "Ресурсы, dp и sp", d: "Все тексты хранят в res/values/strings.xml. Размеры меряют в dp, а размер шрифта — в sp.", e: '<string name="hello">Привет!</string>\n// использование: @string/hello', tip: "Никогда не вписывай текст прямо в код — только в ресурсы!" }
  ],
  drills: [
    { t: "order", q: "Собери код обработки нажатия кнопки", items: ["val button = findViewById<Button>(R.id.btn)", "button.setOnClickListener {", "textView.text = \"Нажата!\"", "}"], explain: "Нашли кнопку → повесили слушатель → меняем текст." },
    { t: "fill", q: "Какой атрибут задаёт текст?", code: '<TextView\n    ___="Привет!" />', options: ["android:text", "android:id", "android:size", "android:click"], answer: 0, explain: "android:text — текст элемента." },
    { t: "choice", q: "Что такое ViewGroup?", options: ["Контейнер для других элементов", "Кнопка", "Картинка", "Цвет фона"], answer: 0, explain: "ViewGroup содержит внутри себя другие View." },
    { t: "tf", q: "Размер шрифта в Android задают в sp.", answer: true, explain: "Да: dp — размеры, sp — шрифты." },
    { t: "choice", q: "Какой контейнер самый гибкий?", options: ["ConstraintLayout", "Кнопка", "TextView", "Картинка"], answer: 0, explain: "ConstraintLayout связывает элементы ограничениями." }
  ],
  test: [
    { t: "choice", q: "Что такое Activity?", options: ["Один экран приложения", "Кнопка", "Картинка", "Библиотека"], answer: 0, explain: "Activity = экран." },
    { t: "fill", q: "Метод, который вызывается при создании экрана:", code: "override fun ___()", options: ["onCreate", "onClick", "onRun", "onBuild"], answer: 0, explain: "onCreate — точка рождения экрана." },
    { t: "choice", q: "Где лежат XML-макеты экранов?", options: ["res/layout/", "java/", "manifests/", "gradle/"], answer: 0, explain: "Все макеты — в res/layout/." },
    { t: "tf", q: "TextView умеет показывать текст.", answer: true, explain: "Это его главная работа." },
    { t: "choice", q: "Как обработать нажатие кнопки?", options: ["setOnClickListener { ... }", "onCreate()", "println()", "findViewById()"], answer: 0, explain: "Слушатель кликов — setOnClickListener." },
    { t: "fill", q: "В чём меряют размер шрифта?", code: 'android:textSize="20___"', options: ["sp", "dp", "px", "pt"], answer: 0, explain: "Шрифты — в sp." },
    { t: "choice", q: "Где правильно хранить тексты приложения?", options: ["res/values/strings.xml", "Прямо в коде", "В манифесте", "В Gradle"], answer: 0, explain: "Тексты — в ресурсах, так их легко переводить." },
    { t: "tf", q: "LinearLayout может выстроить элементы вертикально.", answer: true, explain: "orientation=\"vertical\" — элементы друг под другом." }
  ]
},
{
  id: "a3",
  title: "Логика",
  subtitle: "Жизненный цикл и навигация",
  icon: "⚙️",
  color: "#ff9600",
  cards: [
    { t: "Жизненный цикл Activity", d: "Экран рождается, показывается, прячется и умирает. Система сообщает об этом через методы onCreate, onStart, onResume, onPause, onStop, onDestroy.", e: "onCreate → onStart → onResume\n   ↓\nonPause → onStop → onDestroy", tip: "Выучи порядок: C-S-R-P-S-D (Создан, Старт, Резюме, Пауза, Стоп, Уничтожен)." },
    { t: "onCreate и savedInstanceState", d: "onCreate — создание экрана: тут грузят макет и настраивают элементы. Через savedInstanceState можно восстановить данные после поворота.", e: "override fun onCreate(savedInstanceState: Bundle?) {\n    super.onCreate(savedInstanceState)\n    setContentView(R.layout.activity_main)\n}", tip: "Поворот телефона пересоздаёт Activity — данные надо сохранять." },
    { t: "Intent", d: "«Намерение» — объект для перехода между экранами и запуска чужих приложений (камеры, браузера).", e: "val intent = Intent(this, SecondActivity::class.java)\nstartActivity(intent)", tip: "startActivity(intent) — команда «открыть экран»." },
    { t: "Передача данных", d: "Данные кладут в Intent как «довесок» (extra) с ключом, а на новом экране достают по тому же ключу.", e: '// отправка:\nintent.putExtra("name", "Алекс")\n// получение:\nintent.getStringExtra("name")', tip: "Ключ — обычная строка, главное не опечататься в ней." },
    { t: "Fragment", d: "Кусочек экрана со своей логикой. Фрагменты можно комбинировать и переиспользовать на разных экранах.", e: "class HomeFragment : Fragment() {\n    // свой макет + свой код\n}", tip: "Низ с вкладками в приложениях — обычно фрагменты." },
    { t: "Toast и Snackbar", d: "Всплывающие подсказки: Toast — маленькое сообщение снизу, Snackbar — плашка с кнопкой действия.", e: 'Toast.makeText(this, "Сохранено!", Toast.LENGTH_SHORT).show()', tip: "Toast — для информации, Snackbar — когда нужна кнопка «Отменить»." },
    { t: "Logcat и отладка", d: "Журнал сообщений приложения. Свои метки ставят через Log.d(TAG, \"текст») — так ищут ошибки.", e: 'Log.d("MY_APP", "Кнопка нажата!")', tip: "TAG — метка для фильтра: ищи свои логи по ней." },
    { t: "Разрешения", d: "Доступ к камере, геолокации и файлам надо просить: сначала запись в манифесте, потом запрос у пользователя.", e: '<uses-permission android:name="android.permission.CAMERA" />', tip: "Опасные разрешения спрашивают прямо во время работы приложения." }
  ],
  drills: [
    { t: "order", q: "Собери жизненный цикл по порядку", items: ["onCreate", "onStart", "onResume", "onPause", "onStop", "onDestroy"], explain: "Создан → Старт → Показан → Пауза → Стоп → Уничтожен." },
    { t: "fill", q: "Какой командой открывают новый экран?", code: "___(intent)", options: ["startActivity", "openActivity", "runActivity", "goActivity"], answer: 0, explain: "startActivity(intent) — переход на экран." },
    { t: "choice", q: "Что произойдёт при повороте телефона?", options: ["Activity пересоздастся", "Приложение удалится", "Ничего", "Телефон перезагрузится"], answer: 0, explain: "Поворот = пересоздание Activity." },
    { t: "fill", q: "Как положить строку в Intent?", code: 'intent.___("name", "Алекс")', options: ["putExtra", "getExtra", "addData", "setData"], answer: 0, explain: "putExtra кладёт, getStringExtra достаёт." },
    { t: "tf", q: "Разрешение на камеру достаточно один раз записать в манифест.", answer: false, explain: "Опасные разрешения ещё и запрашивают у пользователя во время работы." }
  ],
  test: [
    { t: "choice", q: "Первый метод жизненного цикла:", options: ["onCreate", "onResume", "onDestroy", "onPause"], answer: 0, explain: "Всё начинается с onCreate." },
    { t: "choice", q: "Что такое Intent?", options: ["Намерение: переход между экранами", "Кнопка", "База данных", "Картинка"], answer: 0, explain: "Intent открывает экраны и чужие приложения." },
    { t: "fill", q: "Достать строку из Intent:", code: 'intent.___("name")', options: ["getStringExtra", "putExtra", "readText", "getData"], answer: 0, explain: "getStringExtra(\"name\") — по тому же ключу." },
    { t: "choice", q: "Что такое Fragment?", options: ["Кусочек экрана со своей логикой", "Ошибка приложения", "Вид кнопки", "Файл с картинками"], answer: 0, explain: "Фрагменты комбинируют экраны из частей." },
    { t: "tf", q: "Toast показывает всплывающее сообщение.", answer: true, explain: "Да, короткое сообщение снизу экрана." },
    { t: "fill", q: "Вывод отладочного сообщения в Logcat:", code: 'Log.___("TAG", "текст")', options: ["d", "print", "show", "echo"], answer: 0, explain: "Log.d — debug-сообщение." },
    { t: "choice", q: "Где объявляют разрешения?", options: ["В AndroidManifest.xml", "В strings.xml", "В коде кнопки", "В Gradle"], answer: 0, explain: "uses-permission живёт в манифесте." },
    { t: "tf", q: "onDestroy вызывается, когда Activity уничтожается.", answer: true, explain: "Это последний метод жизненного цикла." }
  ]
},
{
  id: "a4",
  title: "Профи",
  subtitle: "Данные, сеть и публикация",
  icon: "🏆",
  color: "#ce82ff",
  cards: [
    { t: "RecyclerView", d: "Список, который умеет показывать тысячи строк без тормозов: переиспользует элементы через Adapter и ViewHolder.", e: "Adapter — даёт данные\nViewHolder — держит один ряд\nLayoutManager — раскладывает ряды", tip: "Лента новостей, чаты, каталоги — всё это RecyclerView." },
    { t: "Room", d: "Библиотека-база данных прямо в телефоне. Состоит из Entity (таблица), DAO (запросы) и Database.", e: "@Entity\nclass User(\n    @PrimaryKey val id: Int,\n    val name: String\n)", tip: "Room проверяет SQL-запросы ещё при сборке — ошибиться сложно." },
    { t: "DataStore", d: "Простое хранилище настроек «ключ — значение»: тема, имя пользователя, вкл/выкл уведомлений.", e: '// сохранить тему:\nsettings["theme"] = "dark"\n// прочитать:\nsettings["theme"] // "dark"', tip: "Замена устаревшим SharedPreferences." },
    { t: "Retrofit", d: "Библиотека для работы с интернетом: описываешь API как интерфейс — она сама ходит в сеть и разбирает JSON.", e: "@GET(\"users\")\nsuspend fun getUsers(): List<User>", tip: "Аннотации @GET и @POST описывают запросы." },
    { t: "Корутины", d: "Лёгкие потоки Kotlin: сеть и базу запускают в фоне через launch, а результат возвращают в UI.", e: "lifecycleScope.launch {\n    val users = api.getUsers() // фон\n    adapter.show(users)        // экран\n}", tip: "suspend-функции можно вызывать только из корутин." },
    { t: "MVVM и ViewModel", d: "Архитектура: экран (View) только рисует, а данные и логика живут во ViewModel и переживают поворот.", e: "View (экран) → ViewModel (данные)\n         ↓\n   Repository → Room / Retrofit", tip: "Повернул телефон — ViewModel жива, данные на месте." },
    { t: "Jetpack Compose", d: "Современный способ делать интерфейс кодом на Kotlin вместо XML. Экран — это функции с @Composable.", e: "@Composable\nfun Hello(name: String) {\n    Text(\"Привет, $name!\")\n}", tip: "Compose — будущее Android UI, его активно учат с нуля." },
    { t: "Публикация в Google Play", d: "Финал: приложение подписывают ключом, собирают AAB-файл и загружают в Play Console. Дальше — модерация и миллионы пользователей.", e: "keystore (подпись) → app.aab →\nPlay Console → модерация → Play Market", tip: "Потерял keystore — потерял возможность обновлять приложение!" }
  ],
  drills: [
    { t: "order", q: "Собери путь данных в MVVM", items: ["Room / Retrofit", "Repository", "ViewModel", "Экран (View)"], explain: "Данные идут снизу вверх: база → репозиторий → вьюмодель → экран." },
    { t: "fill", q: "Аннотация Retrofit для получения данных:", code: '@___("users")\nsuspend fun getUsers()', options: ["GET", "POST", "PUT", "FETCH"], answer: 0, explain: "@GET — получить, @POST — отправить." },
    { t: "choice", q: "Что переиспользует строки в RecyclerView?", options: ["ViewHolder", "Intent", "Toast", "Gradle"], answer: 0, explain: "ViewHolder держит один ряд и переиспользуется." },
    { t: "tf", q: "Корутины позволяют не тормозить интерфейс при загрузке из сети.", answer: true, explain: "Да, тяжёлая работа уходит в фон." },
    { t: "choice", q: "В каком формате загружают приложение в Google Play?", options: ["AAB", "MP3", "ZIP", "DOC"], answer: 0, explain: "Android App Bundle (.aab) — формат для Play." }
  ],
  test: [
    { t: "choice", q: "Для чего нужен RecyclerView?", options: ["Быстрые списки из тысяч строк", "Проигрывание музыки", "Рисование карт", "Отправка SMS"], answer: 0, explain: "Списки без тормозов — его стихия." },
    { t: "choice", q: "Что входит в Room?", options: ["Entity, DAO, Database", "Toast, Snack, Log", "View, Button, Text", "Git, Gradle, SDK"], answer: 0, explain: "Три кита Room: Entity, DAO, Database." },
    { t: "choice", q: "Где хранить настройку «тёмная тема»?", options: ["DataStore", "В коде кнопки", "В манифесте", "В Logcat"], answer: 0, explain: "Мелкие настройки — DataStore." },
    { t: "fill", q: "Запрос Retrofit на получение пользователей:", code: '@___("users")', options: ["GET", "POST", "PUSH", "OPEN"], answer: 0, explain: "@GET — читаем данные с сервера." },
    { t: "tf", q: "suspend-функции запускают внутри корутин.", answer: true, explain: "Да, например в lifecycleScope.launch." },
    { t: "choice", q: "Что переживает поворот экрана?", options: ["ViewModel", "Toast", "Intent", "Log"], answer: 0, explain: "ViewModel не умирает при повороте." },
    { t: "fill", q: "Аннотация функции интерфейса в Compose:", code: "___\nfun Hello() { Text(\"Hi\") }", options: ["@Composable", "@Override", "@GET", "@Entity"], answer: 0, explain: "@Composable помечает UI-функции." },
    { t: "tf", q: "Keystore для подписи терять нельзя.", answer: true, explain: "Без него не выпустить обновление приложения." }
  ]
}
];
