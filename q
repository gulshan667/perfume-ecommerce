[33mcommit fb45d77434eef5d99fcba19347a52a8e3647675e[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m)[m
Author: gulshan667 <gulpc26299180@gmail.com>
Date:   Fri Sep 18 17:00:17 2026 +0530

    Error massege change

[1mdiff --git a/src/components/Login.tsx b/src/components/Login.tsx[m
[1mindex 92e9d0a..943a3a2 100644[m
[1m--- a/src/components/Login.tsx[m
[1m+++ b/src/components/Login.tsx[m
[36m@@ -55,7 +55,7 @@[m [mconst Login = () => {[m
         // alert("Invalid email or password");[m
       } else {[m
         console.error(error);[m
[31m-        alert("Something went wrong.");[m
[32m+[m[32m        alert("Not found.");[m
       }[m
     }[m
   };[m
