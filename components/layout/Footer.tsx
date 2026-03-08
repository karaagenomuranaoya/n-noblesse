export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <ul className="flex justify-center gap-6 text-xs text-gray-500 mb-4">
          <li>会員規約</li>
          <li>個人情報保護方針</li>
          <li>セキュリティポリシー</li>
          <li>運営会社</li>
        </ul>
        <p className="text-xs text-gray-400">
          Copyright © NeoCard Co., Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}