import { JSX } from "preact";
import TextGradient from "./TextGradient.tsx";

function MeLigned() {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" id="meligned" width="var(--svgSize)" height="auto" viewBox="0 0 808 1345" fill="none">
        <path d="M714.101 151.202C683.966 109.403 632.488 49.9259 568.5 18.7015C494.022 -17.6416 427.217 23.8613 368.292 31.7554C309.368 39.6495 217.348 19.2573 156 60.2554C108.094 92.2702 93.3139 121.049 46.8454 189.464C31.5924 211.921 23.193 241.6 20.9763 267.966C10.5486 391.997 275.835 256.564 368.292 248.669C460.937 240.759 569.924 263.606 592.97 303.051C603.989 321.909 613.57 343.398 577.161 343.398C540.753 343.398 510.093 272.79 440.151 272.79C366.902 268.966 260.026 317.523 185.772 324.101C111.518 330.68 42.0548 321.032 20.9763 350.854C-3.82219 385.939 3.73036 414.445 11.3952 461.37C14.342 479.411 32.9528 506.103 56.9057 512.243C169.12 541.007 225.267 447.832 343.381 452.161C446.858 455.953 559.763 411.175 621.235 494.701C642.921 524.168 675.093 551.703 654.769 581.974C637.8 607.248 596.356 579.143 577.161 571.887C545.905 560.072 532.193 550.849 498.596 547.328C466.809 543.997 439.672 550.836 418.114 561.362C400.868 569.782 391.766 575.834 379.79 589.43C376.032 593.696 379.311 598.639 373.562 605.218C367.813 611.796 364.771 618.766 368.292 623.198C373.134 629.293 380.697 624.03 385.539 617.936C390.38 611.841 394.162 613.989 400.868 613.989C421.08 613.989 431.635 614.235 458.5 624C491.076 635.841 498.893 644.972 517.5 638.5C540.5 630.5 539.585 617.936 549.5 617.936C572.856 617.936 581.609 597.149 559.915 585.921C538.696 574.939 522.739 564.44 498.596 561.362C479.325 558.905 462.188 561.362 444.463 567.502C415.767 577.442 376.243 599.016 368.292 571.887C361.162 547.558 390.599 517.506 418.114 517.506C431.049 517.506 441.158 528.727 456.918 517.506C493.326 491.582 383.662 487.24 343.381 494.701C314.351 500.077 296.545 523.578 280.625 547.328C254.756 585.921 260.675 619.959 245.175 666.255C229.853 712.021 224.575 730 208.767 775C196.156 810.898 186.591 836.88 232.51 859.5C280.625 883.201 289.894 854.434 301.225 843.5C318.95 826.396 318.449 815.326 345.777 801.253C361.107 793.359 372.726 787.717 385.539 793.359C396.517 798.193 405.219 808.818 400.868 819.234C396.325 830.112 379.79 824.935 368.292 819.234C355.431 812.856 347.031 810.238 336.196 819.234C314.023 837.643 356.795 892.912 362.544 905.63C366.527 914.443 350.524 927.521 336.196 926.681C324.487 925.995 309.362 914.301 301.225 916.591C284.865 921.193 241.737 928.104 224.845 930.625C201.21 934.151 178.856 927.555 198.497 941.589C211.259 950.707 221.013 945.974 232.51 941.589C245.776 936.528 240.538 937.206 254.756 937.206C267.478 937.206 292.668 938.365 305.327 937.206C323.748 935.52 332.409 946.941 350.5 943.346C376.649 938.15 374.11 926.766 400.868 926.681C428.18 926.595 443.881 929.471 469.853 937.206C481.349 940.631 521.855 923.571 516.321 937.206C513.084 945.182 498.599 937.953 491.41 943.346C472.31 957.677 461.266 968.954 438.235 977.115C423.316 982.402 412.905 985.88 396.348 989.391C379.58 992.948 382.934 997.006 362.544 999.202C347.494 1000.82 344.683 1001.83 326 999.202C310.516 997.021 290.723 978.427 280.625 989.391C260.026 1011.76 227.903 1008.44 224.575 1031.05C221.248 1053.66 234.156 1093.41 245.175 1105.26C253.425 1114.12 263.025 1113 280.625 1128.86C310.806 1156.05 303.62 1172.2 343.381 1172.2C371.965 1172.2 362.876 1158.43 408.999 1167.33C470.319 1179.17 485.767 1165.4 515.97 1132.37C570.97 1072.21 592.97 1051 592.97 999.202C592.97 936.167 467.141 1206.75 530.577 1315.5C550 1348.8 578.186 1350.1 624.5 1315.5C668 1283 586.139 1249.91 544.107 1258.9C356.085 1299.13 673.438 1024.55 673.438 899.13C673.438 853 693.85 777.347 707 719C721.888 652.944 712.815 635.009 699.923 602.924C686.854 570.396 707 556.5 707 540.5C707 523.914 695.264 524.5 683.5 524.5C653.5 524.5 717.279 582.125 753 567.502C799.412 548.502 809 483 801 424.701C786 367.033 725 343.398 700 337.201C675 331.005 649.939 331.86 654.769 350.854C659.598 369.847 698.155 373.587 714.101 375.701C766.382 382.633 799.154 351.783 779.5 290.701C767.379 253.031 744.236 193 714.101 151.202Z" stroke="black" stroke-width="7" style="stroke: url(&quot;#gradient&quot;);"/>
            <defs>
            <linearGradient xmlns="http://www.w3.org/2000/svg" id="gradient" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stop-color="var(--hue1)"/>
              <stop offset="100%" stop-color="var(--hue2)"/>
            </linearGradient>
          </defs>
        </svg>
    </>
  )
}
export default function Header(props: JSX.HTMLAttributes<HTMLElement>) {
  
  return(
    <header data-pop style="--animationDelay:1" class="siteHeader flex items-center mx-auto row-span-1 col-span-2">
      <div id="me">
        <MeLigned />
      </div>
      <TextGradient>'s coding room</TextGradient>
    </header>
  )
}