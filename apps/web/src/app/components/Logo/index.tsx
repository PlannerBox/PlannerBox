type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function Logo({
  width = 259,
  height = 40,
  ...restProps
}: LogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 259 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...restProps}
    >
      <g clipPath='url(#clip0_108_1748)'>
        <path
          d='M59.4654 22.8388L59.6993 35.9374H51.3708L51.6047 22.8388L51.3708 9.47947H59.6993L59.4654 22.8388ZM59.9129 28.777C59.3299 28.7364 58.7706 28.6788 58.2418 28.6009C57.713 28.5231 57.0791 28.4452 56.3537 28.3673L57.2486 22.1887C57.5549 22.2548 57.8674 22.2877 58.1807 22.2869C58.6214 22.2869 59.1739 22.3106 59.8349 22.3242C60.4959 22.3377 61.2179 22.3445 61.9942 22.3445C62.5664 22.3543 63.1371 22.2825 63.689 22.1312C64.1539 22.0152 64.5629 21.739 64.8438 21.3513C65.1248 20.9635 65.2596 20.4892 65.2245 20.0118C65.2313 19.5312 65.1146 19.0568 64.8856 18.6339C64.6092 18.1844 64.1832 17.8463 63.6822 17.6792C62.8859 17.4175 62.0486 17.3028 61.2111 17.3407C60.7434 17.3407 60.2451 17.3407 59.7129 17.361C59.1807 17.3813 58.6689 17.3915 58.174 17.4185C57.6791 17.4456 57.2418 17.4829 56.852 17.5336L52.5403 9.47947H62.8111C64.6028 9.4311 66.385 9.75505 68.0448 10.4308C69.4104 11.0022 70.5609 11.989 71.3328 13.251C72.1241 14.6461 72.5147 16.2323 72.4615 17.835C72.5053 19.5429 72.2008 21.2419 71.5667 22.8286C71.0317 24.1212 70.214 25.278 69.1735 26.2141C68.2069 27.0744 67.0838 27.741 65.8652 28.1777C64.6862 28.5999 63.4432 28.8163 62.1908 28.8176C61.2552 28.8221 60.4959 28.8086 59.9129 28.777Z'
          fill='#4A63D4'
        />
        <path
          d='M81.4883 35.9374H72.8785V19.2975L72.5396 6.20229H80.9833V20.4215L81.4883 35.9374Z'
          fill='#4A63D4'
        />
        <path
          d='M98.4538 30.9234C97.7261 31.7554 96.946 32.5402 96.1183 33.273C95.3749 33.9346 94.5676 34.5209 93.7082 35.0233C92.8827 35.5014 92.0001 35.8734 91.0812 36.1303C90.0981 36.397 89.083 36.528 88.0643 36.5197C87.0644 36.5295 86.0769 36.2972 85.1865 35.8426C84.3044 35.3888 83.5688 34.6952 83.0645 33.8417C82.501 32.834 82.2254 31.691 82.268 30.5375C82.221 29.2428 82.5444 27.9616 83.2001 26.8438C83.848 25.8408 84.7836 25.0562 85.8848 24.5925C87.2179 24.0404 88.6449 23.7496 90.088 23.7359L97.247 23.4245L97.2097 25.835L91.9964 26.4071C91.3765 26.4485 90.7723 26.6205 90.2236 26.9116C90.0548 27.0202 89.9174 27.1712 89.8252 27.3494C89.7331 27.5276 89.6892 27.7268 89.6982 27.9272C89.6958 28.2306 89.7843 28.5277 89.9524 28.7804C90.1472 29.0605 90.4262 29.2716 90.749 29.383C91.2115 29.544 91.7001 29.6175 92.1896 29.5997C92.6853 29.5965 93.1799 29.55 93.6675 29.4609C94.1933 29.37 94.7129 29.2468 95.2234 29.0918C95.742 28.9361 96.2403 28.7533 96.742 28.5874L98.4538 30.9234ZM95.8674 22.2565C95.598 21.857 95.1996 21.5618 94.7387 21.4202C94.0143 21.1995 93.2582 21.1011 92.5015 21.1291C91.7761 21.1291 90.9558 21.1629 90.0507 21.2273C89.1457 21.2916 88.2203 21.3694 87.2881 21.4609C86.3559 21.5523 85.4983 21.6471 84.7187 21.752V13.901C85.5492 13.7723 86.3932 13.6538 87.2474 13.5624C88.1016 13.471 88.9796 13.3796 89.8744 13.3288C90.7693 13.278 91.6845 13.251 92.6167 13.251C95.4979 13.251 97.7577 13.5895 99.3961 14.2666C100.933 14.8414 102.198 15.9726 102.938 17.4355C103.65 18.8709 104.033 20.7296 104.087 23.0114L104.359 35.9543H97.7555L96.1962 29.2679V23.6174C96.2143 23.1422 96.1005 22.6712 95.8674 22.2565Z'
          fill='#4A63D4'
        />
        <path
          d='M114.602 35.9374H106.003V19.2975L105.664 13.7791H112.538L114.097 20.4249L114.602 35.9374ZM111.799 18.8371C112.417 18.0905 113.08 17.3827 113.785 16.7177C114.463 16.0755 115.198 15.4964 115.982 14.9877C116.73 14.5048 117.533 14.1138 118.375 13.8231C119.202 13.5394 120.07 13.3953 120.944 13.3965C121.718 13.3994 122.487 13.5239 123.222 13.7656C124.009 14.0252 124.731 14.4487 125.341 15.008C126.049 15.6827 126.589 16.5142 126.917 17.4355C127.36 18.7095 127.577 20.0512 127.558 21.3999L127.792 35.9374H119.155L119.348 24.5485C119.387 24.0345 119.314 23.5182 119.134 23.0351C118.991 22.6488 118.716 22.3252 118.358 22.121C117.929 21.9087 117.453 21.8086 116.975 21.8299C116.676 21.8297 116.377 21.8489 116.08 21.8874C115.778 21.9239 115.479 21.9827 115.185 22.0635C114.901 22.138 114.626 22.2226 114.368 22.314C114.14 22.3915 113.919 22.4889 113.707 22.6052L111.799 18.8371Z'
          fill='#4A63D4'
        />
        <path
          d='M138.025 35.9374H129.425V19.2975L129.086 13.7791H135.974L137.53 20.4249L138.025 35.9374ZM135.225 18.8371C135.842 18.0906 136.504 17.3828 137.208 16.7177C137.887 16.0754 138.624 15.4963 139.408 14.9877C140.156 14.5042 140.959 14.1131 141.801 13.8231C142.627 13.5394 143.494 13.3953 144.367 13.3965C145.141 13.3994 145.91 13.5239 146.645 13.7656C147.432 14.0251 148.156 14.4486 148.767 15.008C149.476 15.6827 150.015 16.5142 150.343 17.4355C150.783 18.7103 151 20.0515 150.984 21.3999L151.218 35.9374H142.577L142.774 24.5485C142.81 24.0346 142.737 23.519 142.561 23.0351C142.416 22.6484 142.14 22.3248 141.781 22.121C141.353 21.9083 140.878 21.8081 140.401 21.8299C140.102 21.8295 139.803 21.8487 139.506 21.8874C139.204 21.9239 138.905 21.9828 138.612 22.0635C138.323 22.138 138.052 22.2226 137.791 22.314C137.563 22.3928 137.342 22.4902 137.13 22.6052L135.225 18.8371Z'
          fill='#4A63D4'
        />
        <path
          d='M173.708 34.4985C172.387 35.1252 170.995 35.5912 169.563 35.8866C167.868 36.2611 166.136 36.4473 164.4 36.4418C161.833 36.4418 159.641 36.0141 157.824 35.1587C156.065 34.3562 154.607 33.0151 153.662 31.3297C152.708 29.6279 152.23 27.5492 152.228 25.0935C152.177 23.2328 152.535 21.3836 153.279 19.6767C153.927 18.2436 154.899 16.9803 156.119 15.9865C157.319 15.0295 158.694 14.3144 160.167 13.8807C161.681 13.4269 163.253 13.1987 164.834 13.2036C167.069 13.2036 168.886 13.5602 170.285 14.2734C171.646 14.9453 172.742 16.054 173.397 17.4219C174.075 18.8055 174.413 20.5084 174.413 22.5307C174.413 23.0757 174.413 23.6513 174.356 24.2607C174.298 24.8701 174.271 25.4727 174.22 26.0686L155.075 25.9501L155.153 23.5802L172.197 22.8015L167.248 24.237C167.377 23.3992 167.283 22.5423 166.976 21.752C166.723 21.1692 166.276 20.6912 165.712 20.3978C165.112 20.1051 164.451 19.96 163.783 19.9746C162.93 19.9444 162.08 20.1028 161.295 20.4384C160.674 20.7244 160.166 21.2109 159.855 21.8197C159.524 22.517 159.363 23.2828 159.387 24.0542C159.366 25.0091 159.552 25.9574 159.933 26.8337C160.28 27.6058 160.867 28.2456 161.607 28.6585C162.508 29.1227 163.513 29.3444 164.526 29.3017C166.186 29.301 167.841 29.1251 169.465 28.777C170.943 28.4818 172.372 27.978 173.708 27.2806V34.4985Z'
          fill='#4A63D4'
        />
        <path
          d='M184.64 35.9374H175.654V19.2975L175.315 13.7791H182.203L184.149 20.4249L184.64 35.9374ZM189.311 23.1875C188.091 23.1875 187.066 23.2202 186.237 23.2857C185.57 23.3274 184.907 23.418 184.254 23.5565C183.889 23.6183 183.542 23.758 183.237 23.9661L182.22 22.5273C182.606 21.3108 183.007 20.1586 183.423 19.0707C183.797 18.0749 184.239 17.1065 184.749 16.1727C185.148 15.4176 185.666 14.7317 186.284 14.1413C186.781 13.667 187.441 13.4005 188.128 13.3965H188.715C188.912 13.3903 189.109 13.4166 189.298 13.4744L189.311 23.1875Z'
          fill='#4A63D4'
        />
        <path
          d='M210.944 32.3995C210.233 33.5436 209.197 34.45 207.968 35.003C206.455 35.667 204.813 35.9862 203.161 35.9374H190.748L190.982 22.8388L190.748 9.47947H203.202C204.596 9.44351 205.982 9.70193 207.27 10.2378C208.331 10.6864 209.238 11.4362 209.876 12.3944C210.509 13.4081 210.828 14.586 210.792 15.7799C210.794 16.7749 210.538 17.7536 210.049 18.6204C209.465 19.5856 208.658 20.3979 207.697 20.9903C206.38 21.8024 204.942 22.399 203.436 22.7575C202.656 22.9403 201.871 23.0893 201.08 23.2044C200.289 23.3195 199.401 23.4109 198.416 23.4786C197.431 23.5418 196.263 23.5734 194.914 23.5734V19.8866C195.355 19.8866 195.826 19.8866 196.335 19.8866L197.928 19.9272C198.487 19.9272 199.07 19.9475 199.68 19.9475H201.528C201.98 19.9598 202.429 19.8803 202.85 19.7139C203.192 19.5767 203.479 19.3303 203.667 19.0131C203.863 18.6427 203.958 18.2268 203.941 17.8079C203.948 17.5797 203.9 17.3532 203.801 17.1472C203.703 16.9411 203.557 16.7614 203.375 16.6229C202.999 16.325 202.307 16.176 201.294 16.176C200.853 16.176 200.297 16.176 199.623 16.1964C198.948 16.2167 198.24 16.2167 197.501 16.2167C196.762 16.2167 196.094 16.2167 195.497 16.2167C194.901 16.2167 194.48 16.237 194.253 16.237L198.416 11.9611V32.9446L194.796 28.9801C195.677 29.0309 196.728 29.0715 197.948 29.0952C199.168 29.1189 200.426 29.1358 201.724 29.1358C202.435 29.1769 203.143 29.0073 203.758 28.6483C204.004 28.4724 204.201 28.236 204.328 27.962C204.456 27.6879 204.511 27.3855 204.487 27.0842C204.511 26.6429 204.372 26.2081 204.097 25.862C203.837 25.5628 203.49 25.3521 203.104 25.2594C202.677 25.1521 202.239 25.0998 201.799 25.1037H200.443C200.016 25.1037 199.596 25.1037 199.179 25.124C198.762 25.1443 198.348 25.124 197.935 25.124C197.521 25.124 197.091 25.124 196.65 25.1443C196.209 25.1646 195.741 25.1646 195.25 25.1646V22.1007C195.847 22.0736 196.436 22.0635 197.019 22.0635C197.602 22.0635 198.304 22.0635 199.121 22.0432C199.938 22.0228 200.867 22.0228 201.904 22.0228C202.954 22.0341 204.002 22.1315 205.036 22.314C206.178 22.5069 207.291 22.8483 208.344 23.3297C209.352 23.7745 210.239 24.4535 210.931 25.3102C211.632 26.2287 211.991 27.3621 211.948 28.5163C211.979 29.8785 211.632 31.2227 210.944 32.3995Z'
          fill='#ED3B43'
        />
        <path
          d='M230.71 14.4054C232.378 15.1467 233.772 16.3894 234.699 17.9602C235.621 19.5401 236.082 21.4902 236.082 23.8104C236.129 25.7773 235.783 27.7337 235.065 29.5658C234.49 31.02 233.6 32.3293 232.459 33.4002C231.318 34.4712 229.954 35.2774 228.466 35.7613C227.045 36.2359 225.557 36.4783 224.059 36.4791C221.646 36.4791 219.577 36.0773 217.852 35.2738C216.183 34.5247 214.789 33.2752 213.863 31.6987C212.927 30.1188 212.461 28.1507 212.463 25.7943C212.417 23.8474 212.763 21.911 213.48 20.0999C214.088 18.6021 215.025 17.2599 216.222 16.1727C217.347 15.1675 218.665 14.4015 220.096 13.9213C221.516 13.4409 223.004 13.1973 224.503 13.2002C226.635 13.1484 228.752 13.5597 230.71 14.4054ZM221.723 21.515C221.125 21.7708 220.632 22.2252 220.33 22.8015C220.017 23.4414 219.863 24.1477 219.883 24.8599C219.863 25.5536 220.017 26.2413 220.33 26.8608C220.654 27.4416 221.16 27.8997 221.771 28.1642C222.602 28.5082 223.499 28.6676 224.398 28.6314C225.231 28.661 226.06 28.5085 226.828 28.1845C227.424 27.9228 227.916 27.4716 228.228 26.9014C228.548 26.2561 228.703 25.5421 228.679 24.8227C228.697 24.1276 228.542 23.439 228.228 22.8185C227.907 22.2423 227.401 21.7913 226.791 21.5387C225.956 21.2093 225.061 21.0571 224.164 21.0918C223.33 21.0609 222.498 21.2062 221.723 21.5184V21.515Z'
          fill='#FFBA14'
        />
        <path
          d='M243.319 35.9374H234.445V35.7038L240.36 24.3149V25.0157L234.991 14.0161V13.7825H244.143L247.753 24.5112L247.133 24.7042L243.319 35.9374ZM246.316 24.5112L249.661 13.7825H258.454V14.0161L253.085 25.0157V24.3149L259 35.7038V35.9374H249.821L245.692 24.7143L246.316 24.5112Z'
          fill='#00ADBF'
        />
        <path
          d='M35.3105 2.61701H33.5038L32.9885 4.50614C32.7595 5.35349 32.262 6.10399 31.5703 6.64531C30.8785 7.18664 30.0299 7.48969 29.1514 7.5091C28.6956 7.52606 28.2423 7.43379 27.8295 7.24002C27.4167 7.04624 27.0564 6.75658 26.7786 6.39526C26.5023 6.01489 26.3178 5.57585 26.2396 5.11246C26.1614 4.64907 26.1916 4.17389 26.3278 3.72408L26.6295 2.60686H20.8297L20.3144 4.49598C20.0747 5.34306 19.5701 6.09139 18.8742 6.63165C18.1784 7.17191 17.3279 7.47581 16.4468 7.49894C15.9918 7.51071 15.5403 7.41613 15.1283 7.22275C14.7163 7.02937 14.3553 6.74253 14.074 6.38511C13.797 6.00706 13.611 5.57031 13.5305 5.1088C13.4499 4.64728 13.477 4.17344 13.6096 3.72408L13.8977 2.61701H12.0199C9.142 2.61701 6.25737 4.84808 5.53198 7.72577L0.203374 27.3381C-0.021041 28.0461 -0.07198 28.7975 0.0548407 29.5292C0.181661 30.2609 0.482534 30.9515 0.932159 31.543C1.36977 32.1026 1.93168 32.553 2.57349 32.8585C3.2153 33.1641 3.91945 33.3164 4.63032 33.3034H7.25055V34.4613C7.25413 35.9286 7.83908 37.3348 8.87756 38.3726C9.91604 39.4104 11.3236 39.9955 12.7927 40H35.3105C36.7795 39.9955 38.1871 39.4104 39.2256 38.3726C40.2641 37.3348 40.849 35.9286 40.8526 34.4613V8.15574C40.8499 6.68818 40.2653 5.28146 39.2266 4.24343C38.1879 3.20539 36.7798 2.62059 35.3105 2.61701ZM4.671 29.9551C4.47982 29.9662 4.28866 29.9332 4.11231 29.8587C3.93596 29.7841 3.77917 29.67 3.65409 29.5252C3.52336 29.34 3.4428 29.1243 3.42023 28.8989C3.39766 28.6734 3.43385 28.446 3.52528 28.2387L7.8946 11.8493H34.6224L30.453 27.3821C30.0666 28.7973 28.5616 29.9992 27.1888 29.9992H4.671V29.9551ZM37.5002 34.4613C37.4984 35.0411 37.2673 35.5967 36.8571 36.007C36.4469 36.4173 35.891 36.649 35.3105 36.6517H12.8368C12.2559 36.649 11.6997 36.4174 11.289 36.0072C10.8782 35.597 10.6463 35.0414 10.6436 34.4613V33.3034H27.1888C30.0666 33.3034 32.9512 31.0724 33.6766 28.1947L37.5002 13.9755V34.4613Z'
          fill='#1D1D1B'
        />
        <path
          d='M16.4468 5.9653C16.9791 5.94267 17.4905 5.75179 17.9072 5.42018C18.3239 5.08857 18.6244 4.63336 18.7654 4.12019L19.3687 1.84511C19.6264 0.829454 19.0298 0 18.0366 0C17.5038 0.0224457 16.9919 0.213197 16.5747 0.544779C16.1574 0.876362 15.8563 1.33166 15.7146 1.84511L15.1147 4.12019C14.857 5.10537 15.457 5.9653 16.4468 5.9653Z'
          fill='#1D1D1B'
        />
        <path
          d='M29.1514 5.9653C29.6837 5.94267 30.1951 5.75179 30.6118 5.42018C31.0285 5.08857 31.3289 4.63336 31.4699 4.12019L32.0733 1.84511C32.3309 0.829454 31.7343 0 30.7411 0C30.2087 0.0234751 29.6973 0.214607 29.2802 0.546033C28.8632 0.877459 28.5618 1.33219 28.4192 1.84511L27.7955 4.12019C27.7219 4.3329 27.7011 4.56026 27.7349 4.78276C27.7686 5.00526 27.8559 5.21627 27.9892 5.39769C28.1225 5.57911 28.2979 5.72553 28.5003 5.82439C28.7027 5.92325 28.9261 5.9716 29.1514 5.9653Z'
          fill='#1D1D1B'
        />
        <path
          d='M20.528 21.9314H16.5315C16.3905 21.9405 16.2549 21.9896 16.1408 22.073C16.0267 22.1563 15.9389 22.2705 15.8875 22.402L15.1147 25.3204C15.0909 25.3741 15.0816 25.4331 15.0876 25.4916C15.0936 25.5501 15.1148 25.606 15.149 25.6538C15.1832 25.7016 15.2292 25.7397 15.2827 25.7644C15.3361 25.789 15.395 25.7993 15.4536 25.7943H19.4535C19.5948 25.7846 19.7304 25.7348 19.8445 25.6509C19.9586 25.567 20.0463 25.4523 20.0975 25.3204L20.8704 22.402C20.8935 22.3481 20.9022 22.2892 20.8957 22.2309C20.8892 22.1726 20.8676 22.117 20.8331 22.0696C20.7985 22.0221 20.7523 21.9845 20.6988 21.9603C20.6453 21.936 20.5865 21.9261 20.528 21.9314Z'
          fill='#4A63D4'
        />
        <path
          d='M13.4808 21.9314H9.49115C9.35007 21.9405 9.21452 21.9896 9.10043 22.073C8.98634 22.1563 8.89845 22.2705 8.8471 22.402L8.06747 25.3204C8.04372 25.3741 8.0344 25.4331 8.04041 25.4916C8.04642 25.5501 8.06757 25.606 8.10177 25.6538C8.13598 25.7016 8.18205 25.7397 8.23547 25.7644C8.28889 25.789 8.34781 25.7993 8.40644 25.7943H12.4063C12.5476 25.7846 12.6833 25.7348 12.7973 25.6509C12.9114 25.567 12.9991 25.4523 13.0503 25.3204L13.8232 22.402C13.8463 22.3481 13.8551 22.2892 13.8485 22.2309C13.842 22.1726 13.8204 22.117 13.7859 22.0696C13.7514 22.0221 13.7051 21.9845 13.6516 21.9603C13.5981 21.936 13.5393 21.9261 13.4808 21.9314Z'
          fill='#00ADBF'
        />
        <path
          d='M27.5752 21.9314H23.5787C23.4377 21.9405 23.3021 21.9896 23.188 22.073C23.0739 22.1563 22.986 22.2705 22.9347 22.402L22.1618 25.3204C22.1381 25.3741 22.1288 25.4331 22.1348 25.4916C22.1408 25.5501 22.1619 25.606 22.1961 25.6538C22.2303 25.7016 22.2764 25.7397 22.3298 25.7644C22.3833 25.789 22.4422 25.7993 22.5008 25.7943H26.5006C26.642 25.7846 26.7776 25.7348 26.8917 25.6509C27.0057 25.567 27.0935 25.4523 27.1447 25.3204L27.9175 22.402C27.9405 22.3484 27.9492 22.2898 27.9428 22.2318C27.9364 22.1739 27.9151 22.1185 27.881 22.0712C27.8469 22.0238 27.8012 21.9861 27.7482 21.9616C27.6952 21.9371 27.6368 21.9267 27.5786 21.9314H27.5752Z'
          fill='#ED3B43'
        />
        <path
          d='M22.1618 15.7935H18.1654C18.0259 15.8014 17.8914 15.8485 17.7774 15.9293C17.6635 16.0102 17.5747 16.1215 17.5214 16.2505L16.7485 19.1689C16.7248 19.2226 16.7154 19.2816 16.7214 19.3401C16.7275 19.3986 16.7486 19.4545 16.7828 19.5023C16.817 19.5501 16.8631 19.5882 16.9165 19.6129C16.9699 19.6375 17.0288 19.6478 17.0875 19.6428H21.0873C21.2287 19.6331 21.3643 19.5833 21.4784 19.4994C21.5924 19.4155 21.6802 19.3008 21.7314 19.1689L22.5042 16.2505C22.5272 16.1969 22.5359 16.1383 22.5295 16.0803C22.5231 16.0223 22.5018 15.967 22.4677 15.9197C22.4336 15.8723 22.3879 15.8346 22.3349 15.8101C22.2819 15.7856 22.2234 15.7752 22.1652 15.7799L22.1618 15.7935Z'
          fill='#FFBA14'
        />
        <path
          d='M15.1553 15.7935H11.1623C11.0212 15.8003 10.8849 15.8468 10.7691 15.9277C10.6534 16.0086 10.5629 16.1205 10.508 16.2505L9.7352 19.1689C9.71145 19.2226 9.70212 19.2816 9.70814 19.3401C9.71415 19.3986 9.7353 19.4545 9.7695 19.5023C9.8037 19.5501 9.84978 19.5882 9.9032 19.6129C9.95662 19.6375 10.0155 19.6478 10.0742 19.6428H14.0842C14.2254 19.6327 14.3609 19.5828 14.4749 19.4989C14.5888 19.415 14.6767 19.3006 14.7282 19.1689L15.5011 16.2505C15.524 16.1969 15.5327 16.1383 15.5263 16.0803C15.52 16.0223 15.4987 15.967 15.4646 15.9197C15.4305 15.8723 15.3847 15.8346 15.3317 15.8101C15.2787 15.7856 15.2203 15.7752 15.1621 15.7799L15.1553 15.7935Z'
          fill='#ED3B43'
        />
        <path
          d='M24.1787 19.7004H28.1751C28.3151 19.6886 28.4489 19.638 28.5615 19.5542C28.6741 19.4705 28.761 19.3569 28.8124 19.2264L29.5853 16.3081C29.6082 16.2545 29.6169 16.1958 29.6105 16.1379C29.6041 16.0799 29.5829 16.0246 29.5488 15.9772C29.5147 15.9299 29.4689 15.8922 29.4159 15.8677C29.3629 15.8432 29.3045 15.8328 29.2463 15.8375H25.2532C25.1123 15.847 24.9769 15.8962 24.8629 15.9795C24.7489 16.0628 24.6609 16.1768 24.6092 16.3081L23.8363 19.2264C23.8126 19.2802 23.8033 19.3392 23.8093 19.3977C23.8153 19.4561 23.8364 19.512 23.8706 19.5598C23.9048 19.6077 23.9509 19.6458 24.0043 19.6704C24.0578 19.6951 24.1167 19.7054 24.1753 19.7004H24.1787Z'
          fill='#00ADBF'
        />
      </g>
      <defs>
        <clipPath id='clip0_108_1748'>
          <rect width='259' height='40' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}