<?php


    if(isset($_GET['nickname'])&&!empty($_GET['nickname'])){
        if(isset($_GET['offline'])){
            
            function createJavaUuid($striped) {
                //example: 069a79f4-44e9-4726-a5be-fca90e38aaf5
                $components = array(
                    substr($striped, 0, 8),
                    substr($striped, 8, 4),
                    substr($striped, 12, 4),
                    substr($striped, 16, 4),
                    substr($striped, 20),
                );
                return implode('-', $components);
            }

            $username = $_GET['nickname'];
            $data = hex2bin(md5("OfflinePlayer:" . $username));
            //set the version to 3 -> Name based md5 hash
            $data[6] = chr(ord($data[6]) & 0x0f | 0x30);
            //IETF variant
            $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
            // echo bin2hex($data);
            $uuid = createJavaUuid(bin2hex($data));
            echo $uuid;
            $name = 'OfflinePlayer:'.$_GET['nickname'];
            


        }else{

            $curl = curl_init();

            curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.mojang.com/users/profiles/minecraft/".$_GET['nickname'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "cache-control: no-cache"
            ),
            ));

            $response = curl_exec($curl);
            $err = curl_error($curl);

            curl_close($curl);
            
            $response = json_decode($response, true); //because of true, it's in an array
            if($response==null){
                echo json_encode([
                    'error' => 'Online player not found!'
                ]);
                exit();
            }else{
                $name = $response['name'];
                $uuid = $response['id'];               
            }
        };
    }elseif(isset($_GET['uuid'])&&!empty($_GET['uuid'])){
        $uuid = $_GET['uuid'];
        $uuid = str_replace('-','',$uuid);
        if(strlen($uuid)!=32){
            echo json_encode([
                'error' => 'Wrong custom UUID!'
            ]);
            exit();
        }else{
            $name = "Custom UUID";
        }
    }else{
        if(isset($_GET['uuid'])&&!isset($_GET['nickname'])){
            echo json_encode([
                'error' => 'UUID is not set!'
            ]);
            exit();    
        };
        echo json_encode([
            'error' => 'Nickname is not set!'
        ]);
        exit();
    }

    $uuid = str_replace('-','',$uuid);
    if(strlen($uuid)!=32){
        echo json_encode([
            'error' => 'Wrong custom UUID!'
        ]);
        exit();
    }
    for($i=0;$i<=3;$i++){
        $hex = substr($uuid,$i*8,8);
        $bin = decbin(hexdec($hex));
        if(strlen($bin)%4==0){
            $msb = intval($bin[0]);
            $dec = (-$msb)*pow(2,(strlen($bin)-1)) + bindec(substr($bin,1));
        }else{
            $dec = bindec($bin);
        }
        $fourInt[$i] = $dec;
    }

    echo json_encode([
        'name' => $name,
        'uuid' => $uuid,
        'fourInt' => $fourInt
        // 'OfflinePlayer' => isset($_GET['offline'])?true:false
    ]);
    exit();
    

?>