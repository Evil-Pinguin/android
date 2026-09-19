/* ===== Трек "Android": Этапы 1, 3-8 + чекпоинты ===== */
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
  ],
  checkpoint: { title: "Первое приложение", desc: "Собери по шагам своё первое приложение и докажи, что готов идти дальше!",
    questions: [
      { t: "order", q: "Порядок создания первого приложения", items: ["New Project", "Empty Activity", "Нажать Finish", "Нажать Run ▶"], explain: "Проект → шаблон → готово → запуск." },
      { t: "choice", q: "Ты нажал Run ▶. Что произойдёт?", options: ["Gradle соберёт APK и поставит на устройство", "Проект удалится", "Откроется браузер", "Ничего"], answer: 0, explain: "Сборка + установка + запуск." },
      { t: "fill", q: "Где писать код нового экрана?", code: "java/com.myapp/___", options: ["MainActivity.kt", "strings.xml", "icon.png", "build.gradle.kts"], answer: 0, explain: "Код экранов — Kotlin-файлы." },
      { t: "tf", q: "Без записи экрана в AndroidManifest.xml он не запустится.", answer: true, explain: "Манифест — паспорт всех экранов." },
      { t: "choice", q: "Эмулятор не запускается. Что попробовать?", options: ["Проверить AVD Manager и свободное место", "Удалить проект", "Выкинуть компьютер", "Ждать неделю"], answer: 0, explain: "AVD Manager + место на диске решают 90% проблем." }
    ] }
},
{
  id: "a2",
  title: "Интерфейсы на XML",
  subtitle: "Этап 3 · View, раскладки, кнопки",
  icon: "🎨",
  color: "#1cb0f6",
  cards: [
    { t: "View и ViewGroup", d: "View — отдельный элемент (кнопка, текст). ViewGroup — контейнер, внутри которого лежат элементы.", e: "TextView, Button, ImageView — это View\nLinearLayout — это ViewGroup", tip: "Всё, что видишь на экране, — это View." },
    { t: "LinearLayout", d: "Простой контейнер: кладёт элементы в линию — вертикально или горизонтально.", e: '<LinearLayout\n    android:orientation="vertical">\n    ...\n</LinearLayout>', tip: "Идеален для первых экранов и простых рядов." },
    { t: "ConstraintLayout", d: "Профессиональный контейнер: элементы привязываются друг к другу и к краям связями-ограничениями.", e: "app:layout_constraintTop_toTopOf=\"parent\"\napp:layout_constraintStart_toStartOf=\"parent\"", tip: "Один ConstraintLayout заменяет вложенные контейнеры." },
    { t: "TextView", d: "Элемент для показа текста. Самый частый гость на экране.", e: 'android:text="Привет, мир!"\nandroid:textSize="20sp"\nandroid:textColor="@color/black"', tip: "Размер текста всегда задавай в sp." },
    { t: "Button и клик", d: "Кнопка. Реакцию на нажатие задаём через слушатель кликов в коде.", e: "button.setOnClickListener {\n    textView.text = \"Нажата!\"\n}", tip: "Внутри слушателя обычно пишут лямбду { ... }." },
    { t: "EditText", d: "Поле для ввода текста. Подсказка — атрибут hint, ввод читают через text.toString().", e: 'android:hint="Введи имя"\nandroid:inputType="number"\n// код: editText.text.toString()', tip: "inputType ограничивает ввод: number, textEmailAddress и т.д." },
    { t: "ImageView", d: "Элемент для картинок. Картинки кладут в папку drawable, иконки приложения — в mipmap.", e: 'android:src="@drawable/cat"\nandroid:scaleType="centerCrop"', tip: "scaleType управляет обрезкой картинки." },
    { t: "CheckBox, Switch, RadioButton", d: "Переключатели: галочка, тумблер и радиокнопка. Состояние читают через isChecked.", e: "if (checkBox.isChecked) {\n    // галочка стоит!\n}", tip: "RadioButton объединяют в RadioGroup — выбор один из многих." },
    { t: "Отступы и размеры", d: "padding — отступ ВНУТРИ элемента, margin — СНАРУЖИ. Размеры — в dp, шрифты — в sp.", e: 'android:padding="16dp"\nandroid:layout_margin="8dp"', tip: "padding начинается с P — «Personal», внутренний." },
    { t: "findViewById и View Binding", d: "Связь кода и экрана: findViewById ищет элемент по id. View Binding делает это удобнее и без ошибок.", e: "val btn = findViewById<Button>(R.id.btn)\n// или с View Binding:\n// binding.btn", tip: "У каждого элемента в XML должен быть android:id." },
    { t: "Toast и Snackbar", d: "Всплывающие сообщения: Toast — короткое снизу, Snackbar — плашка с кнопкой действия.", e: 'Toast.makeText(this, "Сохранено!", Toast.LENGTH_SHORT).show()', tip: "Snackbar умеет кнопку «Отменить» — Toast нет." },
    { t: "Ресурсы и темы", d: "Тексты — в strings.xml, цвета — в colors.xml. Так их легко менять и переводить. Темы задают общий стиль.", e: '<string name="hello">Привет!</string>\n<color name="green">#58CC02</color>', tip: "Никогда не вписывай текст прямо в код — только в ресурсы!" }
  ],
  drills: [
    { t: "order", q: "Собери шаги экрана с кнопкой", items: ["Нарисовать Button в XML", "Найти её через findViewById", "Повесить setOnClickListener", "Показать Toast"], explain: "Разметка → поиск → слушатель → действие." },
    { t: "fill", q: "Какой атрибут задаёт ВНУТРЕННИЙ отступ?", code: 'android:___="16dp"', options: ["padding", "margin", "spacing", "indent"], answer: 0, explain: "padding — внутри, margin — снаружи." },
    { t: "choice", q: "Что такое ViewGroup?", options: ["Контейнер для других элементов", "Кнопка", "Картинка", "Цвет фона"], answer: 0, explain: "ViewGroup содержит внутри себя другие View." },
    { t: "fill", q: "Как прочитать ввод пользователя?", code: "editText.___.toString()", options: ["text", "hint", "id", "src"], answer: 0, explain: "text — введённый текст." },
    { t: "tf", q: "View Binding избавляет от ручного findViewById.", answer: true, explain: "Да, и защищает от ошибок с id." }
  ],
  test: [
    { t: "choice", q: "Что такое View?", options: ["Элемент интерфейса: кнопка, текст, картинка", "База данных", "Экран телефона", "Библиотека"], answer: 0, explain: "View — строительный кирпичик интерфейса." },
    { t: "fill", q: "LinearLayout выстроит элементы вертикально, если…", code: 'android:orientation="___"', options: ["vertical", "horizontal", "linear", "column"], answer: 0, explain: "vertical — друг под другом." },
    { t: "choice", q: "Какой элемент нужен для ввода чисел?", options: ["EditText", "TextView", "ImageView", "Switch"], answer: 0, explain: "Ввод — всегда EditText." },
    { t: "choice", q: "Где лежат картинки для ImageView?", options: ["В папке drawable", "В папке java", "В манифесте", "В Gradle"], answer: 0, explain: "drawable — дом картинок." },
    { t: "fill", q: "Какой атрибут задаёт ВНЕШНИЙ отступ?", code: 'android:layout___="8dp"', options: ["margin", "padding", "gap", "space"], answer: 0, explain: "margin — снаружи элемента." },
    { t: "choice", q: "Как узнать, стоит ли галочка в CheckBox?", options: ["checkBox.isChecked", "checkBox.text", "checkBox.id", "checkBox.hint"], answer: 0, explain: "isChecked возвращает true/false." },
    { t: "tf", q: "Все тексты приложения правильно хранить в strings.xml.", answer: true, explain: "Так их легко менять и переводить." },
    { t: "fill", q: "Покажи короткое всплывающее сообщение:", code: 'Toast.makeText(this, "Hi", ___)', options: ["Toast.LENGTH_SHORT", "Toast.LONG", "3000", "true"], answer: 0, explain: "LENGTH_SHORT — короткое сообщение." }
  ],
  checkpoint: { title: "Калькулятор", desc: "Чекпоинт этапа: собери логику калькулятора — два поля, кнопка, результат!",
    questions: [
      { t: "order", q: "Шаги работы калькулятора", items: ["Прочитать текст из EditText", "Превратить в число toInt()", "Сложить числа", "Показать в TextView"], explain: "Ввод → число → счёт → вывод." },
      { t: "fill", q: "Преврати ввод в число:", code: "val a = editA.text.toString().___()", options: ["toInt", "toString", "toText", "toNum"], answer: 0, explain: "toInt() делает из текста число." },
      { t: "choice", q: "Какой inputType разрешит только цифры?", options: ["number", "text", "password", "email"], answer: 0, explain: "inputType=\"number\" — цифровая клавиатура." },
      { t: "tf", q: "Текст кнопки «Посчитать» должен лежать в strings.xml.", answer: true, explain: "Все тексты — в ресурсах!" },
      { t: "fill", q: "Повесь действие на кнопку:", code: "button.___ {\n    result.text = sum.toString()\n}", options: ["setOnClickListener", "onCreate", "findViewById", "showToast"], answer: 0, explain: "Слушатель кликов запускает подсчёт." },
      { t: "choice", q: "Куда вывести ответ?", options: ["В TextView", "В манифест", "В Gradle", "В Logcat навсегда"], answer: 0, explain: "Ответ показывают в TextView." }
    ] }
},
{
  id: "a3",
  title: "Экраны и навигация",
  subtitle: "Этап 4 · Activity, Intent",
  icon: "⚙️",
  color: "#ff9600",
  cards: [
    { t: "Activity", d: "Один экран приложения. Каждый экран — это класс, наследник Activity.", e: "class MainActivity : AppCompatActivity() {\n    // код экрана\n}", tip: "Приложение — это набор Activity, связанных переходами." },
    { t: "Жизненный цикл", d: "Экран рождается, показывается, прячется и умирает. Система сообщает об этом методами onCreate → onStart → onResume → onPause → onStop → onDestroy.", e: "onCreate → onStart → onResume\n   ↓\nonPause → onStop → onDestroy", tip: "Выучи порядок: C-S-R-P-S-D." },
    { t: "onCreate", d: "Рождение экрана: тут грузят макет через setContentView и настраивают элементы.", e: "override fun onCreate(savedInstanceState: Bundle?) {\n    super.onCreate(savedInstanceState)\n    setContentView(R.layout.activity_main)\n}", tip: "onCreate выполняется один раз при создании." },
    { t: "Intent", d: "«Намерение» — объект для перехода между экранами и запуска чужих приложений.", e: "val intent = Intent(this, SecondActivity::class.java)\nstartActivity(intent)", tip: "startActivity(intent) — команда «открыть экран»." },
    { t: "Передача данных", d: "Данные кладут в Intent как «довесок» (extra) с ключом, а на новом экране достают по тому же ключу.", e: '// отправка:\nintent.putExtra("name", "Алекс")\n// получение:\nintent.getStringExtra("name")', tip: "Ключ — обычная строка, главное не опечататься." },
    { t: "Поворот экрана", d: "При повороте Activity УМИРАЕТ и создаётся заново! Введённые данные пропадут, если их не сохранить в savedInstanceState или ViewModel.", e: "// сохранить:\noutState.putString(\"name\", name)\n// восстановить в onCreate:\nsavedInstanceState?.getString(\"name\")", tip: "Поворот — главный враг новичков. Проверяй приложение поворотом!" }
  ],
  drills: [
    { t: "order", q: "Собери жизненный цикл по порядку", items: ["onCreate", "onStart", "onResume", "onPause", "onStop", "onDestroy"], explain: "Создан → Старт → Показан → Пауза → Стоп → Уничтожен." },
    { t: "fill", q: "Какой командой открывают новый экран?", code: "___(intent)", options: ["startActivity", "openActivity", "runActivity", "goActivity"], answer: 0, explain: "startActivity(intent) — переход на экран." },
    { t: "choice", q: "Что произойдёт при повороте телефона?", options: ["Activity пересоздастся", "Приложение удалится", "Ничего", "Телефон перезагрузится"], answer: 0, explain: "Поворот = смерть и перерождение Activity." },
    { t: "fill", q: "Как положить строку в Intent?", code: 'intent.___("name", "Алекс")', options: ["putExtra", "getExtra", "addData", "setData"], answer: 0, explain: "putExtra кладёт, getStringExtra достаёт." },
    { t: "tf", q: "onDestroy — последний метод жизненного цикла.", answer: true, explain: "После него экрана больше нет." }
  ],
  test: [
    { t: "choice", q: "Первый метод жизненного цикла:", options: ["onCreate", "onResume", "onDestroy", "onPause"], answer: 0, explain: "Всё начинается с onCreate." },
    { t: "fill", q: "Загрузи макет в onCreate:", code: "___(R.layout.activity_main)", options: ["setContentView", "setLayout", "loadView", "showXML"], answer: 0, explain: "setContentView связывает код и XML." },
    { t: "choice", q: "Что такое Intent?", options: ["Намерение: переход между экранами", "Кнопка", "База данных", "Картинка"], answer: 0, explain: "Intent открывает экраны и чужие приложения." },
    { t: "fill", q: "Достать строку из Intent:", code: 'intent.___("name")', options: ["getStringExtra", "putExtra", "readText", "getData"], answer: 0, explain: "getStringExtra(\"name\") — по тому же ключу." },
    { t: "tf", q: "При повороте введённый текст сохранится сам.", answer: false, explain: "Нет! Activity пересоздаётся, данные надо сохранять." },
    { t: "choice", q: "Зачем нужен savedInstanceState?", options: ["Восстановить данные после пересоздания", "Сохранить картинку", "Ускорить запуск", "Закрыть экран"], answer: 0, explain: "Пачка-спасатель данных при повороте." },
    { t: "choice", q: "Когда вызывается onResume?", options: ["Экран виден и активен", "Экран уничтожен", "Приложение удалено", "Телефон выключен"], answer: 0, explain: "onResume — экран полностью готов к работе." },
    { t: "tf", q: "Второй экран тоже надо объявить в AndroidManifest.xml.", answer: true, explain: "Иначе переход упадёт с ошибкой!" }
  ],
  checkpoint: { title: "Приложение-анкета", desc: "Чекпоинт этапа: анкета — вводишь данные на одном экране, видишь их на другом!",
    questions: [
      { t: "order", q: "Шаги работы анкеты", items: ["Ввести имя в EditText", "Нажать кнопку", "Положить имя в Intent", "Открыть второй экран", "Показать имя в TextView"], explain: "Ввод → Intent → переход → вывод." },
      { t: "fill", q: "Передай имя на второй экран:", code: 'intent.___("name", editText.text.toString())', options: ["putExtra", "getExtra", "sendData", "pushData"], answer: 0, explain: "putExtra с ключом «name»." },
      { t: "fill", q: "Прочитай имя на втором экране:", code: 'val name = intent.___("name")', options: ["getStringExtra", "putExtra", "readExtra", "takeString"], answer: 0, explain: "Тот же ключ — то же имя." },
      { t: "tf", q: "Если пользователь повернёт телефон на первом экране, введённое имя сохранится само.", answer: false, explain: "Нет, надо сохранять в savedInstanceState." },
      { t: "choice", q: "Что будет, если забыть второй экран в манифесте?", options: ["Приложение упадёт при переходе", "Ничего страшного", "Экран откроется сам", "Телефон перезагрузится"], answer: 0, explain: "ActivityNotFoundException — классика!" },
      { t: "choice", q: "Ключ putExtra — это…", options: ["Обычная строка", "Число", "Пароль", "Файл"], answer: 0, explain: "Строка-метка, по ней достаём значение." }
    ] }
},
{
  id: "a4",
  title: "Списки",
  subtitle: "Этап 5 · RecyclerView",
  icon: "📋",
  color: "#ce82ff",
  cards: [
    { t: "RecyclerView", d: "Главный компонент для списков: показывает тысячи строк без тормозов, переиспользуя элементы.", e: "Список чатов, лента новостей,\nкаталог товаров — всё это он", tip: "Самый используемый компонент в реальных приложениях!" },
    { t: "Adapter", d: "«Официант» списка: берёт данные и раскладывает их по рядам. Ты пишешь его сам.", e: "class TaskAdapter(val tasks: List<Task>) :\n    RecyclerView.Adapter<...>()", tip: "Адаптер знает, СКОЛЬКО рядов и ЧТО в каждом." },
    { t: "ViewHolder", d: "Держатель одного ряда: хранит ссылки на TextView и другие элементы строки.", e: "class Holder(view: View) :\n    RecyclerView.ViewHolder(view) {\n    val title: TextView = ...\n}", tip: "Один ViewHolder = один видимый ряд на экране." },
    { t: "LayoutManager", d: "Управляет расположением рядов: вертикальный список, горизонтальный или сетка.", e: "recycler.layoutManager =\n    LinearLayoutManager(this)", tip: "GridLayoutManager — сетка как в галерее." },
    { t: "CardView", d: "Красивая карточка со скруглением и тенью — идеальный ряд для списка.", e: '<androidx.cardview.widget.CardView\n    app:cardCornerRadius="12dp"\n    app:cardElevation="4dp">', tip: "Карточки делают список аккуратным и современным." },
    { t: "Клик по элементу", d: "Нажатие обрабатывают внутри адаптера: вешают слушатель на весь ряд или на кнопку в нём.", e: "holder.itemView.setOnClickListener {\n    onTaskClick(task)\n}", tip: "Через клик обычно открывают детали или удаляют." },
    { t: "Добавление и удаление", d: "Меняешь список данных и СООБЩАЕШЬ адаптеру: notifyItemInserted / notifyItemRemoved / notifyDataSetChanged.", e: "tasks.add(newTask)\nadapter.notifyItemInserted(tasks.size - 1)", tip: "Забыл notify — список не обновится!" }
  ],
  drills: [
    { t: "order", q: "Собери шаги создания списка", items: ["Создать ViewHolder ряда", "Написать Adapter", "Поставить LayoutManager", "Передать данные в адаптер"], explain: "Ряд → официант → раскладка → данные." },
    { t: "fill", q: "Сообщи списку, что всё изменилось:", code: "adapter.___()", options: ["notifyDataSetChanged", "refresh", "reload", "update"], answer: 0, explain: "notify... — команда «перерисуйся»." },
    { t: "choice", q: "Что хранит ViewHolder?", options: ["Элементы одного ряда", "Весь список", "Базу данных", "Картинки интернета"], answer: 0, explain: "Ссылки на TextView и кнопки одного ряда." },
    { t: "tf", q: "RecyclerView переиспользует ряды, поэтому не тормозит.", answer: true, explain: "Да, в этом его суперсила." },
    { t: "choice", q: "Что такое CardView?", options: ["Карточка со скруглением и тенью", "Банковская карта", "Игра", "Кнопка"], answer: 0, explain: "Красивый контейнер для ряда списка." }
  ],
  test: [
    { t: "choice", q: "Зачем нужен RecyclerView?", options: ["Быстрые списки из тысяч строк", "Проигрывание музыки", "Рисование карт", "Отправка SMS"], answer: 0, explain: "Списки без тормозов — его стихия." },
    { t: "choice", q: "Что делает Adapter?", options: ["Наполняет список данными", "Подключает интернет", "Рисует иконки", "Хранит пароли"], answer: 0, explain: "Адаптер связывает данные и ряды." },
    { t: "choice", q: "Сколько ViewHolder создаётся для 1000 задач?", options: ["Только для видимых на экране", "Ровно 1000", "Один на всё", "Ни одного"], answer: 0, explain: "Переиспользование — суть RecyclerView." },
    { t: "fill", q: "Поставь вертикальный список:", code: "recycler.layoutManager = ___(this)", options: ["LinearLayoutManager", "Adapter", "ViewHolder", "CardView"], answer: 0, explain: "LayoutManager раскладывает ряды." },
    { t: "tf", q: "CardView добавляет карточке скругление и тень.", answer: true, explain: "Да: cardCornerRadius и cardElevation." },
    { t: "choice", q: "Как правильно удалить элемент?", options: ["removeAt + notifyItemRemoved", "Просто скрыть", "Удалить весь список", "Перезапустить приложение"], answer: 0, explain: "Удалил данные → сообщил адаптеру." },
    { t: "fill", q: "Удали задачу под номером pos:", code: "tasks.___(pos)", options: ["removeAt", "delete", "drop", "pop"], answer: 0, explain: "removeAt удаляет по номеру." },
    { t: "tf", q: "Клик по ряду обрабатывают внутри адаптера.", answer: true, explain: "Слушатель вешают на itemView." }
  ],
  checkpoint: { title: "Список задач (Todo)", desc: "Чекпоинт этапа: приложение Todo — добавляй задачи в список!",
    questions: [
      { t: "order", q: "Шаги добавления задачи", items: ["Ввести текст в EditText", "Нажать кнопку «+»", "Добавить в MutableList", "Вызвать notifyItemInserted"], explain: "Ввод → данные → обновление списка." },
      { t: "fill", q: "Добавь задачу в список:", code: "tasks.___(newTask)", options: ["add", "push", "insert", "append"], answer: 0, explain: "add кладёт в конец списка." },
      { t: "choice", q: "Где хранить задачи в этом приложении?", options: ["В MutableList", "В TextView", "В манифесте", "В Toast"], answer: 0, explain: "Пока — в обычном списке (база будет позже!)." },
      { t: "tf", q: "После tasks.add(...) надо вызвать notify, иначе список не обновится.", answer: true, explain: "Адаптер сам не узнает об изменениях." },
      { t: "choice", q: "Какой LayoutManager для обычного вертикального Todo?", options: ["LinearLayoutManager", "GridLayoutManager", "CardManager", "ListManager"], answer: 0, explain: "Линейный — друг под другом." },
      { t: "fill", q: "Удали выполненную задачу:", code: "tasks.removeAt(pos)\nadapter.___(pos)", options: ["notifyItemRemoved", "notifyAll", "refresh", "delete"], answer: 0, explain: "Точечное обновление с анимацией." }
    ] }
},
{
  id: "a5",
  title: "Хранение данных",
  subtitle: "Этап 6 · Room и настройки",
  icon: "💾",
  color: "#58cc02",
  cards: [
    { t: "SharedPreferences", d: "Простое хранилище «ключ — значение»: тема, имя, флаги. Старый, но рабочий способ.", e: 'prefs.edit()\n    .putString("theme", "dark")\n    .apply()', tip: "Только для мелочей, не для списков!" },
    { t: "DataStore", d: "Современная замена SharedPreferences: те же настройки, но быстрее и безопаснее.", e: '// сохранить тему:\nsettings["theme"] = "dark"', tip: "Новые проекты — только DataStore." },
    { t: "Room — обзор", d: "Настоящая база данных прямо в телефоне. Три кита: Entity (таблица), DAO (запросы), Database (держатель).", e: "Entity → таблица\nDAO → запросы\nDatabase → база", tip: "Room проверяет SQL ещё при сборке — ошибиться сложно." },
    { t: "Entity", d: "Класс-таблица: каждое поле — колонка. Аннотация @Entity, ключ — @PrimaryKey.", e: "@Entity\nclass Task(\n    @PrimaryKey(autoGenerate = true)\n    val id: Int = 0,\n    val title: String\n)", tip: "autoGenerate сам нумерует строки." },
    { t: "DAO", d: "Интерфейс с запросами: @Insert, @Delete, @Query с SQL. Функции — suspend, вызываются из корутин.", e: "@Dao\ninterface TaskDao {\n    @Query(\"SELECT * FROM task\")\n    suspend fun getAll(): List<Task>\n    @Insert\n    suspend fun add(t: Task)\n}", tip: "DAO = Data Access Object, «доступ к данным»." },
    { t: "Database", d: "Класс-держатель базы: перечисляет таблицы и даёт доступ к DAO.", e: "@Database(entities = [Task::class], version = 1)\nabstract class AppDB : RoomDatabase() {\n    abstract fun taskDao(): TaskDao\n}", tip: "version увеличивают при изменении таблиц." },
    { t: "CRUD", d: "4 базовые операции: Create (создать), Read (прочитать), Update (изменить), Delete (удалить).", e: "@Insert  // C — создать\n@Query   // R — прочитать\n@Update  // U — изменить\n@Delete  // D — удалить", tip: "Любое хранилище данных — это CRUD." }
  ],
  drills: [
    { t: "order", q: "Собери базу Room по порядку", items: ["Создать Entity-таблицу", "Написать DAO с запросами", "Создать Database", "Пользоваться через DAO"], explain: "Таблица → запросы → база → работа." },
    { t: "fill", q: "Аннотация класса-таблицы:", code: "@___\nclass Task(...)", options: ["Entity", "Table", "Dao", "Base"], answer: 0, explain: "@Entity делает класс таблицей." },
    { t: "choice", q: "Что живёт в DAO?", options: ["Запросы к базе", "Картинки", "Кнопки", "Шрифты"], answer: 0, explain: "DAO — все SQL-запросы в одном месте." },
    { t: "tf", q: "Room проверяет SQL-запросы ещё при сборке приложения.", answer: true, explain: "Ошибка в запросе — узнаешь сразу, а не у пользователя." },
    { t: "choice", q: "Что современнее для настроек?", options: ["DataStore", "SharedPreferences", "Бумажный блокнот", "Toast"], answer: 0, explain: "DataStore — наследник SharedPreferences." }
  ],
  test: [
    { t: "choice", q: "Для чего SharedPreferences?", options: ["Мелкие настройки ключ-значение", "Хранение фильмов", "Списки на 1000 строк", "Картинки"], answer: 0, explain: "Тема, имя, флаги — его уровень." },
    { t: "fill", q: "Аннотация таблицы Room:", code: "@___\nclass User(...)", options: ["Entity", "Dao", "Query", "Table"], answer: 0, explain: "@Entity = таблица." },
    { t: "fill", q: "Запрос «дай всех пользователей»:", code: '@___("SELECT * FROM user")', options: ["Query", "Get", "Select", "Find"], answer: 0, explain: "@Query с SQL внутри." },
    { t: "choice", q: "Что такое Database в Room?", options: ["Класс-держатель базы и DAO", "Папка с картинками", "Файл настроек", "Кнопка"], answer: 0, explain: "Точка входа ко всем таблицам." },
    { t: "tf", q: "CRUD — это создать, прочитать, изменить, удалить.", answer: true, explain: "Create, Read, Update, Delete." },
    { t: "fill", q: "Функции DAO помечают так:", code: "___ fun getAll(): List<Task>", options: ["suspend", "async", "await", "launch"], answer: 0, explain: "suspend — вызывать из корутин." },
    { t: "choice", q: "Почему база читается в фоне?", options: ["Чтобы не тормозить экран", "Чтобы было сложнее", "Так модно", "Без причины"], answer: 0, explain: "Долгая работа — только в фоне!" },
    { t: "tf", q: "Данные в Room переживают закрытие приложения.", answer: true, explain: "База хранится в файле на телефоне." }
  ],
  checkpoint: { title: "Todo с сохранением", desc: "Чекпоинт этапа: задачи переживают перезапуск — закрыл, открыл, всё на месте!",
    questions: [
      { t: "order", q: "Шаги сохранения задач", items: ["Создать Entity Task", "Написать DAO с запросами", "Создать Database", "Сохранять при добавлении", "Читать при запуске"], explain: "База → запись → чтение." },
      { t: "fill", q: "Сохрани новую задачу:", code: "@___\nsuspend fun add(t: Task)", options: ["Insert", "Query", "Delete", "Select"], answer: 0, explain: "@Insert добавляет строку." },
      { t: "fill", q: "Прочитай все задачи при запуске:", code: '@Query("SELECT * FROM task")\n___ fun getAll(): List<Task>', options: ["suspend", "fun fun", "async", "public"], answer: 0, explain: "suspend — база читается в корутине." },
      { t: "tf", q: "Без базы данных задачи пропадут после закрытия приложения.", answer: true, explain: "MutableList живёт только пока запущено приложение." },
      { t: "choice", q: "А настройку «тёмная тема» хранить в…", options: ["DataStore", "Room-таблице на 1000 строк", "Intent", "Toast"], answer: 0, explain: "Мелкие настройки — DataStore." },
      { t: "choice", q: "Где вызывать dao.getAll()?", options: ["В корутине (lifecycleScope.launch)", "В onCreate напрямую", "В XML-разметке", "В манифесте"], answer: 0, explain: "suspend — только из корутин!" }
    ] }
},
{
  id: "a6",
  title: "Интернет и API",
  subtitle: "Этап 7 · Retrofit, корутины",
  icon: "🌐",
  color: "#ff4b4b",
  cards: [
    { t: "API и JSON", d: "API — «меню» сервера: приложение просит данные, сервер отдаёт их в формате JSON (текст со скобками).", e: '// запрос: GET /weather?city=Казань\n// ответ JSON:\n{ "temp": -5, "city": "Казань" }', tip: "JSON — самый популярный формат обмена данными." },
    { t: "Разрешение INTERNET", d: "Доступ в сеть надо объявить в манифесте. Обычное разрешение — спрашивать у пользователя не нужно.", e: '<uses-permission\n    android:name="android.permission.INTERNET" />', tip: "Без этой строки интернета не будет!" },
    { t: "Корутины", d: "Лёгкие фоновые задачи Kotlin: сеть и база уходят в фон через launch, экран не тормозит.", e: "lifecycleScope.launch {\n    val w = api.getWeather() // фон\n    text.text = w.temp       // экран\n}", tip: "Запустил в launch — экран живёт своей жизнью." },
    { t: "suspend и Dispatchers", d: "suspend — метка долгих функций. Dispatchers.IO — фон для сети/базы, Main — поток экрана.", e: "suspend fun load(): Data\nwithContext(Dispatchers.IO) {\n    // сеть здесь\n}", tip: "Рисовать можно только в Main!" },
    { t: "Retrofit", d: "Библиотека для сети: описываешь API как интерфейс — она сама ходит на сервер и разбирает JSON.", e: "@GET(\"weather\")\nsuspend fun getWeather(): Weather", tip: "@GET — получить, @POST — отправить." },
    { t: "Coil", d: "Библиотека загрузки картинок из интернета в одну строку: сама качает, кэширует и показывает.", e: "imageView.load(\"https://.../cat.png\")", tip: "Coil — Coil + Image = картинки легко." },
    { t: "Загрузка и ошибки", d: "Пока идёт запрос — показывай ProgressBar. Сеть может упасть: лови ошибки через try/catch и показывай сообщение.", e: "try {\n    val w = api.getWeather()\n} catch (e: Exception) {\n    toast(\"Нет интернета\")\n}", tip: "Всегда думай: «а если интернета нет?»" }
  ],
  drills: [
    { t: "order", q: "Собери шаги запроса в сеть", items: ["Добавить разрешение INTERNET", "Описать запрос в Retrofit", "Запустить в корутине", "Показать данные на экране"], explain: "Доступ → запрос → фон → экран." },
    { t: "fill", q: "Аннотация Retrofit для получения данных:", code: '@___("weather")\nsuspend fun getWeather()', options: ["GET", "POST", "PUT", "FETCH"], answer: 0, explain: "@GET — получить, @POST — отправить." },
    { t: "choice", q: "Dispatchers.IO — это фон для…", options: ["Сети и базы данных", "Рисования кнопок", "Музыки", "Ничего"], answer: 0, explain: "IO = Input/Output: сеть, файлы, база." },
    { t: "tf", q: "Сетевой запрос в главном потоке заморозит экран.", answer: true, explain: "Поэтому сеть — только в корутинах!" },
    { t: "choice", q: "Что делает Coil?", options: ["Грузит картинки из интернета", "Готовит кофе", "Шьёт одежду", "Строит графики"], answer: 0, explain: "imageView.load(url) — и картинка на экране." }
  ],
  test: [
    { t: "choice", q: "Что такое JSON?", options: ["Текстовый формат данных от сервера", "Язык программирования", "Картинка", "Вирус"], answer: 0, explain: "Текст со скобками: { \"temp\": -5 }." },
    { t: "fill", q: "Разрешение на интернет в манифесте:", code: '<uses-permission android:name="android.permission.___" />', options: ["INTERNET", "WIFI", "HTTP", "NETWORK"], answer: 0, explain: "INTERNET — доступ в сеть." },
    { t: "choice", q: "Как запустить фоновую задачу?", options: ["lifecycleScope.launch { ... }", "println()", "onCreate()", "Toast()"], answer: 0, explain: "launch запускает корутину." },
    { t: "fill", q: "Переключись на фон для сети:", code: "___(Dispatchers.IO) {\n    api.getWeather()\n}", options: ["withContext", "runOn", "switchTo", "inThread"], answer: 0, explain: "withContext меняет поток." },
    { t: "tf", q: "suspend-функции вызывают только из корутин.", answer: true, explain: "Да, или из других suspend-функций." },
    { t: "choice", q: "Что описывает интерфейс Retrofit?", options: ["Запросы к серверу", "Кнопки экрана", "Таблицы базы", "Цвета темы"], answer: 0, explain: "Методы с @GET/@POST = запросы." },
    { t: "fill", q: "Загрузи картинку через Coil:", code: 'imageView.___("https://.../pic.png")', options: ["load", "show", "set", "fetch"], answer: 0, explain: "load(url) — загрузка в одну строку." },
    { t: "tf", q: "Ошибки сети надо обрабатывать через try/catch.", answer: true, explain: "Интернет может пропасть в любой момент!" }
  ],
  checkpoint: { title: "Погода из API", desc: "Чекпоинт этапа: приложение погоды — данные с настоящего сервера!",
    questions: [
      { t: "order", q: "Шаги приложения погоды", items: ["Найти открытый API погоды", "Добавить разрешение INTERNET", "Описать запрос в Retrofit", "Запустить в корутине", "Показать температуру"], explain: "API → доступ → запрос → фон → экран." },
      { t: "choice", q: "В каком формате сервер отдаст погоду?", options: ["JSON", "DOC", "MP3", "EXE"], answer: 0, explain: "JSON разбирает Retrofit." },
      { t: "fill", q: "Запрос прогноза:", code: '@GET("forecast")\n___ fun getForecast(): Forecast', options: ["suspend", "fun", "async", "public"], answer: 0, explain: "Сеть — suspend + корутина." },
      { t: "tf", q: "Пока грузится прогноз, надо показать ProgressBar.", answer: true, explain: "Пользователь должен видеть, что идёт загрузка." },
      { t: "fill", q: "На каком потоке идёт запрос?", code: "withContext(Dispatchers.___)", options: ["IO", "Main", "UI", "Zero"], answer: 0, explain: "IO — для сети и базы." },
      { t: "choice", q: "Иконку погоды (солнце/туча) грузим через…", options: ["Coil", "Room", "Toast", "Gradle"], answer: 0, explain: "Картинки из сети — Coil." }
    ] }
},
{
  id: "a7",
  title: "Современный Android",
  subtitle: "Этап 8 · Compose, ViewModel",
  icon: "✨",
  color: "#1cb0f6",
  cards: [
    { t: "Jetpack Compose", d: "Современный способ делать интерфейс кодом на Kotlin — без XML! Экран — это функции.", e: "@Composable\nfun Hello() {\n    Text(\"Привет!\")\n}", tip: "Compose — будущее Android UI." },
    { t: "@Composable и Text", d: "Аннотация @Composable помечает функции интерфейса. Text — текст, Button — кнопка.", e: "@Composable\nfun Hello(name: String) {\n    Text(\"Привет, $name!\")\n}", tip: "Preview показывает экран без запуска приложения!" },
    { t: "Column, Row, Box", d: "Контейнеры Compose: Column — столбец, Row — ряд, Box — друг на друге.", e: "Column {\n    Text(\"Строка 1\")\n    Text(\"Строка 2\")\n}", tip: "Замена LinearLayout — Column и Row." },
    { t: "State", d: "Состояние: remember + mutableStateOf. Изменилось значение — экран перерисовался сам!", e: "var count by remember {\n    mutableStateOf(0)\n}\nButton(onClick = { count++ }) {\n    Text(\"Нажато: $count\")\n}", tip: "Магия Compose: данные меняются — UI обновляется." },
    { t: "ViewModel", d: "Хранилище данных экрана: переживает поворот! Экран только рисует, логика — во ViewModel.", e: "class TaskViewModel : ViewModel() {\n    val tasks = mutableStateListOf<Task>()\n}", tip: "Повернул телефон — ViewModel жива, данные на месте." },
    { t: "Navigation Component", d: "Удобная навигация: экраны и переходы описываются в графе, переход — одна команда.", e: 'navController.navigate("details")', tip: "Замена ручным Intent-переходам." }
  ],
  drills: [
    { t: "order", q: "Собери экран на Compose", items: ["Написать fun с @Composable", "Положить Text внутрь", "Добавить Preview", "Увидеть экран"], explain: "Функция → элементы → предпросмотр." },
    { t: "fill", q: "Аннотация функции интерфейса:", code: "@___\nfun Hello() {\n    Text(\"Hi\")\n}", options: ["Composable", "Override", "Preview", "Fun"], answer: 0, explain: "@Composable помечает UI-функции." },
    { t: "choice", q: "Зачем нужен remember?", options: ["Хранить состояние при перерисовке", "Запоминать пароль", "Рисовать кнопки", "Грузить картинки"], answer: 0, explain: "remember сохраняет значение между перерисовками." },
    { t: "tf", q: "В Compose интерфейс пишут кодом на Kotlin вместо XML.", answer: true, explain: "Да, XML больше не нужен!" },
    { t: "choice", q: "Что переживает поворот экрана?", options: ["ViewModel", "Toast", "Intent", "Log"], answer: 0, explain: "ViewModel не умирает при повороте." }
  ],
  test: [
    { t: "choice", q: "Что такое Jetpack Compose?", options: ["UI кодом на Kotlin без XML", "Редактор картинок", "База данных", "Игра"], answer: 0, explain: "Современный декларативный UI." },
    { t: "fill", q: "Покажи текст в Compose:", code: '___("Привет!")', options: ["Text", "Label", "Print", "Show"], answer: 0, explain: "Text — аналог TextView." },
    { t: "choice", q: "Что делает Column?", options: ["Кладёт элементы столбцом", "Рисует круг", "Грузит сеть", "Играет звук"], answer: 0, explain: "Column — вертикаль, Row — горизонталь." },
    { t: "fill", q: "Создай счётчик состояния:", code: "var n by ___(mutableStateOf(0))", options: ["remember", "state", "save", "hold"], answer: 0, explain: "remember хранит состояние." },
    { t: "tf", q: "Изменение state автоматически перерисовывает экран.", answer: true, explain: "В этом магия Compose!" },
    { t: "choice", q: "Где держать список задач, чтобы пережил поворот?", options: ["Во ViewModel", "В Toast", "В кнопке", "В манифесте"], answer: 0, explain: "ViewModel переживает пересоздание." },
    { t: "fill", q: "Перейди на экран деталей:", code: 'navController.___("details")', options: ["navigate", "go", "open", "push"], answer: 0, explain: "navigate — переход в Navigation Component." },
    { t: "tf", q: "Preview показывает Composable без запуска приложения.", answer: true, explain: "Мгновенный предпросмотр экрана!" }
  ],
  checkpoint: { title: "Todo на Compose", desc: "Финальный чекпоинт: переписываем Todo на современный стек!",
    questions: [
      { t: "order", q: "Шаги Todo на Compose", items: ["ViewModel со списком задач", "LazyColumn для списка", "TextField + Button для ввода", "State для текста", "Готово!"], explain: "Данные → список → ввод → состояние." },
      { t: "choice", q: "Что такое LazyColumn?", options: ["Ленивый список в Compose", "Медленный интернет", "Старый телефон", "Кнопка"], answer: 0, explain: "Аналог RecyclerView в Compose." },
      { t: "fill", q: "Выведи все задачи:", code: "LazyColumn {\n    ___(tasks) { t ->\n        Text(t.title)\n    }\n}", options: ["items", "list", "each", "for"], answer: 0, explain: "items перебирает список." },
      { t: "tf", q: "Список во ViewModel переживёт поворот экрана.", answer: true, explain: "ViewModel не пересоздаётся!" },
      { t: "choice", q: "Поле ввода в Compose — это…", options: ["TextField", "EditText", "InputBox", "TypeText"], answer: 0, explain: "TextField + state для текста." },
      { t: "choice", q: "Где хранить текст ввода?", options: ["remember + mutableStateOf", "В манифесте", "В Gradle", "Нигде"], answer: 0, explain: "Состояние ввода — в state." }
    ] }
}
];
